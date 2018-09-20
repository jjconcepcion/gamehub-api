const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const api = require('../../index');
const { User } = require('../../models/users');

describe('PUT /api/users/:id', async () => {
  let user;
  let token;
  let id;
  let payload;

  beforeEach(async () => {
    const data = {
      name: 'aaaa',
      email: 'a@mail.com',
      password: '12345678',
    };

    // user to be updated
    user = new User(data);
    await user.save();

    token = await user.generateAuthToken();

    id = user._id;

    payload = {
      email: 'new@mail.com',
    };
  });

  afterEach(async () => {
    await User.remove({});
  });

  const putRequest = () => request(api)
    .put(`/api/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(payload);

  it('should return 401 if user is not logged in', async () => {
    token = '';

    const res = await putRequest();

    expect(res.status).toBe(401);
  });

  it('should return 403 if not logged in as user being updated', async () => {
    token = await jwt.sign({
      _id: 1,
    }, config.get('jwtPrivateKey'));

    const res = await putRequest();

    expect(res.status).toBe(403);
  });


  // Case where the user record is no longer in database since last login.
  // Auth token expiry, not currently handled, can allow this to occur.
  it('should return 404 if user is not in database', async () => {
    id = new mongoose.Types.ObjectId();
    token = await jwt.sign({
      _id: id,
    }, config.get('jwtPrivateKey'));

    const res = await putRequest();

    expect(res.status).toBe(404);
  });

  it('should return 400 if email is not provided', async () => {
    delete payload.email;

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if email is invalid', async () => {
    payload.email = 'a';

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 409 if new email is already registered', async () => {
    const existing = await new User({
      name: 'existingUser',
      email: 'exisiting@mail.com',
      password: '123445678',
    }).save();

    payload.email = existing.email;

    const res = await putRequest();

    expect(res.status).toBe(409);
  });

  it('should update the user email', async () => {
    await putRequest();

    const userInDb = await User.findById(user._id);

    expect(userInDb.email).toBe(payload.email);
  });

  it('should return the updated user information', async () => {
    const res = await putRequest();

    ['_id', 'name', 'email'].forEach((p) => {
      expect(res.body).toHaveProperty(p);
    });
  });
});

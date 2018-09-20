const request = require('supertest');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const api = require('../../index');
const { User } = require('../../models/users');

describe('DELETE /api/users/:id', async () => {
  let user;
  let userToken;
  let adminToken;
  let token;


  beforeEach(async () => {
    user = new User({
      name: 'aaaa',
      email: 'a@mail.com',
      password: '12345678',
    });

    const generateUserToken = () => user.generateAuthToken();
    const generateAdminToken = () => jwt.sign({
      _id: 1,
      isAdmin: true,
    }, config.get('jwtPrivateKey'));

    const testSetup = [
      user.save(),
      generateUserToken(),
      generateAdminToken(),
    ];

    [user, userToken, adminToken] = await Promise.all(testSetup);

    token = adminToken;
  });

  afterEach(async () => {
    // cleanup database
    await User.remove({});
  });

  const deleteRequest = id => request(api)
    .delete(`/api/users/${id}`)
    .set('Authorization', `Bearer ${token}`);

  it('should return 401 if not logged in', async () => {
    const res = await request(api).delete('/api/users/1');

    expect(res.status).toBe(401);
  });

  it('should return 403 if not logged in as admin', async () => {
    token = userToken;

    const res = await deleteRequest(1);

    expect(res.status).toBe(403);
  });

  it('should return 404 if user id is not in database', async () => {
    const res = await deleteRequest(new mongoose.Types.ObjectId());

    expect(res.status).toBe(404);
  });

  it('should delete user from database if valid', async () => {
    await deleteRequest(user._id);

    const userInDb = await User.findById(user._id);

    expect(userInDb).toBeNull();
  });

  it('should return deleted user if valid', async () => {
    const properties = ['_id', 'name', 'email'];

    const res = await deleteRequest(user._id);

    properties.forEach((p) => {
      expect(res.body).toHaveProperty(p);
    });
  });

  it('should return 200 if valid', async () => {
    const res = await deleteRequest(user._id);

    expect(res.status).toBe(200);
  });
});

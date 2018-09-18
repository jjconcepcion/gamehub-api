const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const api = require('../../index');
const { User } = require('../../models/users');

describe('GET methods on /api/users', async () => {
  let payload;
  let user;
  let token;
  let userToken;
  let adminToken;

  beforeEach(async () => {
    payload = {
      name: 'aaaa',
      email: 'a@mail.com',
      password: '12345678',
    };

    // create a regular user
    user = new User(payload);
    await user.save();

    userToken = await user.generateAuthToken();

    adminToken = await jwt.sign({
      _id: 1,
      isAdmin: true,
    }, config.get('jwtPrivateKey'));

    token = adminToken;
  });

  afterEach(async () => {
    // cleanup database
    await User.remove({});
  });

  const getRequest = id => request(api)
    .get(`/api/users/${id}`)
    .set('Authorization', `Bearer ${token}`);

  //
  // GET /api/users
  //
  describe('GET /', async () => {
    it('should return 401 if not logged in', async () => {
      token = '';
      const res = await getRequest('');

      expect(res.status).toBe(401);
    });

    it('should return 403 if not logged in as admin', async () => {
      token = userToken;
      const res = await getRequest('');

      expect(res.status).toBe(403);
    });

    it('should return list of users if logged in as admin', async () => {
      // populate database
      const user1 = { name: 'user1', email: 'a@mail.com', password: 'password1' };
      const user2 = { name: 'user2', email: 'b@mail.com', password: 'password2' };
      await User.insertMany([user1, user2]);

      const res = await getRequest('');

      expect(res.status).toBe(200);

      // db should have 3 users: 2 inserted in this test, 1 created in beforeEach
      expect(res.body.length).toBe(3);

      delete user1.password;
      delete user2.password;
      // check that elements returned have name and email properties
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(user2),
          expect.objectContaining(user1),
        ]),
      );
    });
  });

  //
  // GET /api/users/:id
  //
  describe('GET /:id', async () => {
    it('should return 401 if not logged in', async () => {
      token = '';

      const res = await getRequest(user._id);

      expect(res.status).toBe(401);
    });

    it('should return 403 if not logged in as admin', async () => {
      token = userToken;

      const res = await getRequest(user._id);

      expect(res.status).toBe(403);
    });

    it('should return 200 if id references a valid user', async () => {
      const res = await getRequest(user._id);

      expect(res.status).toBe(200);
    });

    it('should return user if id is valid', async () => {
      const res = await getRequest(user._id);

      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(['_id', 'name', 'email']),
      );
    });

    it('should return 400 if id is not valid ObjectId', async () => {
      const res = await getRequest(1);

      expect(res.status).toBe(400);
    });

    it('should return 404 if id does not reference valid user', async () => {
      const id = new mongoose.Types.ObjectId();

      const res = await getRequest(id);

      expect(res.status).toBe(404);
    });
  });
});

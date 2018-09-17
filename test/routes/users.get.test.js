const request = require('supertest');
const mongoose = require('mongoose');
const api = require('../../index');
const { User } = require('../../models/users');

describe('GET methods on /api/users', async () => {
  let payload;

  beforeEach(() => {
    payload = {
      name: 'aaaa',
      email: 'a@mail.com',
      password: '12345678',
    };
  });

  afterEach(async () => {
    // cleanup database
    await User.remove({});
  });

  //
  // GET /api/users
  //
  describe('GET /', async () => {
    it('should return list of users', async () => {
      const user1 = { name: 'user1', email: 'a@mail.com', password: 'password1' };
      const user2 = { name: 'user2', email: 'b@mail.com', password: 'password2' };

      await User.insertMany([user1, user2]);

      const res = await request(api).get('/api/users');

      expect(res.status).toBe(200);

      expect(res.body.length).toBe(2);

      delete user1.password;
      delete user2.password;

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
    const getRequest = id => request(api)
      .get(`/api/users/${id}`);

    it('should return 200 if id references a valid user', async () => {
      const user = new User(payload);
      await user.save();

      const res = await getRequest(user._id);

      expect(res.status).toBe(200);
    });

    it('should return user if id is valid', async () => {
      const user = new User(payload);
      await user.save();

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

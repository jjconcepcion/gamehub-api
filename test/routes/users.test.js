const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const api = require('../../index');
const { User } = require('../../models/users');

describe('/api/users', async () => {
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
  describe('GET /api/users', async () => {
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

  //
  // POST /api/users
  //
  describe('POST /', async () => {
    const postRequest = () => request(api)
      .post('/api/users')
      .send(payload);

    it('should respond 200 status if request is valid', async () => {
      const res = await postRequest();

      expect(res.status).toBe(200);
    });

    it('should respond 400 status if name is not provided', async () => {
      delete payload.name;

      const res = await postRequest();

      expect(res.status).toBe(400);
    });

    it('should respond 400 status if email is not provided', async () => {
      delete payload.email;

      const res = await postRequest();

      expect(res.status).toBe(400);
    });

    it('should respond 400 status if password is not provided', async () => {
      delete payload.password;

      const res = await postRequest();

      expect(res.status).toBe(400);
    });

    it('should create the user in the database if valid', async () => {
      await postRequest();

      const userInDb = await User.findOne({ email: payload.email });

      ['name', 'email', '_id'].forEach((p) => {
        expect(userInDb).toHaveProperty(p);
      });
    });

    it('should return created user', async () => {
      const res = await postRequest();

      ['name', 'email', '_id'].forEach((p) => {
        expect(res.body).toHaveProperty(p);
      });
    });

    it('should return 409 if user with email already exists', async () => {
      const user = new User({
        name: 'bbbb',
        email: payload.email,
        password: '12345678',
      });

      await user.save();

      const res = await postRequest();

      expect(res.status).toBe(409);
    });

    it('should return 409 if user with name already exists', async () => {
      const user = new User({
        name: payload.name,
        email: 'b@mail.com',
        password: '12345678',
      });

      await user.save();

      const res = await postRequest();

      expect(res.status).toBe(409);
    });

    it('should set authorization response header if valid request', async () => {
      const res = await postRequest();

      expect(res.header.authorization).toBeDefined();
    });

    it('should return authorization token if valid request', async () => {
      const res = await postRequest();

      const token = res.header.authorization.split(' ')[1];
      const decoded = jwt.decode(token);

      expect(decoded).toHaveProperty('_id');
    });
  });
});

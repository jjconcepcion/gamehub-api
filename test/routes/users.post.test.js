const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const api = require('../..');
const { User } = require('../../models/users');

describe('POST methods on /api/users', async () => {
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

    it('should hash the user password', async () => {
      const res = await postRequest();

      const saved = await User.findOne({ _id: res.body._id }).select('password');

      const plaintext = payload.password;
      const hashed = saved.password;
      const match = await bcrypt.compare(plaintext, hashed);

      expect(match).toBeTruthy();
    });
  });
});

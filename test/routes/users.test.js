const request = require('supertest');
const api = require('../../index');
const { User } = require('../../models/users');

describe('/api/users', async () => {
  let payload;

  beforeEach(() => {
    payload = {
      name: 'aaaa',
      email: 'aaaa',
      password: '12345678',
    };
  });

  //
  // GET /api/users
  //
  describe('GET /api/users', async () => {
    it('should return list of users', async () => {
      const user1 = { name: 'user1', email: 'email1', password: 'password1' };
      const user2 = { name: 'user2', email: 'email2', password: 'password2' };

      await User.insertMany([user1, user2]);

      const res = await request(api).get('/api/users');

      expect(res.status).toBe(200);

      expect(res.body.length).toBe(2);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(user2),
          expect.objectContaining(user1),
        ]),
      );
    });
  });

  //
  // POST /api/users
  //
  describe('POST /', async () => {
    afterEach(async () => {
      // cleanup database
      await User.remove({});
    });

    it('should respond 200 status if request is valid', async () => {
      const res = await request(api)
        .post('/api/users')
        .send(payload);

      expect(res.status).toBe(200);
    });

    it('should respond 400 status if name is not provided', async () => {
      delete payload.name;

      const res = await request(api)
        .post('/api/users')
        .send(payload);

      expect(res.status).toBe(400);
    });

    it('should respond 400 status if email is not provided', async () => {
      delete payload.email;

      const res = await request(api)
        .post('/api/users')
        .send(payload);

      expect(res.status).toBe(400);
    });

    it('should respond 400 status if password is not provided', async () => {
      delete payload.password;

      const res = await request(api)
        .post('/api/users')
        .send(payload);

      expect(res.status).toBe(400);
    });

    it('should create the user in the database if valid', async () => {
      await request(api)
        .post('/api/users')
        .send(payload);

      const userInDb = await User.findOne({ email: payload.email });

      ['name', 'email', 'password'].forEach((p) => {
        expect(userInDb).toHaveProperty(p);
      });
    });

    it('should return created user', async () => {
      const res = await request(api)
        .post('/api/users')
        .send(payload);

      ['name', 'email', 'password'].forEach((p) => {
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

      const res = await request(api)
        .post('/api/users')
        .send(payload);

      expect(res.status).toBe(409);
    });

    it('should return 409 if user with name already exists', async () => {
      const user = new User({
        name: payload.name,
        email: 'bbbb',
        password: '12345678',
      });

      await user.save();

      const res = await request(api)
        .post('/api/users')
        .send(payload);

      expect(res.status).toBe(409);
    });
  });
});

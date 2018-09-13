const request = require('supertest');
const api = require('../..');
const { User } = require('../../models/users');

describe('Login', async () => {
  let payload;

  beforeEach(async () => {
    const data = {
      name: 'aaa',
      email: 'a@mail.com',
      password: '12345678',
    };

    await new User(data).save();

    payload = {
      name: data.name,
      password: data.password,
    };
  });

  afterEach(async () => {
    await User.remove({});
  });

  const loginRequest = () => request(api)
    .post('/api/login')
    .send(payload);

  describe('POST /api/login', async () => {
    it('should return 400 if name is not provided', async () => {
      delete payload.name;

      const res = await loginRequest();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password is not provided', async () => {
      delete payload.password;

      const res = await loginRequest();

      expect(res.status).toBe(400);
    });

    it('should return 404 if name is not valid user ', async () => {
      payload.name = 'a';

      const res = await loginRequest();

      expect(res.status).toBe(404);
    });
  });
});

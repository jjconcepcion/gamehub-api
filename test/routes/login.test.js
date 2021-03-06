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

    await request(api).post('/api/users').send(data);

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

    it('should return 400 if password is incorrect', async () => {
      payload.password = 'a';

      const res = await loginRequest();

      expect(res.status).toBe(400);
    });

    it('should return authorization token if login is valid', async () => {
      const res = await loginRequest();

      const [type, token] = res.header.authorization.split(' ');

      expect(type).toBe('Bearer');
      expect(token).toBeDefined();
    });

    it('should return user name and id if valid', async () => {
      const res = await loginRequest();

      expect(res.body._id).toBeDefined();
      expect(res.body.name).toBe(payload.name);
    });
  });
});

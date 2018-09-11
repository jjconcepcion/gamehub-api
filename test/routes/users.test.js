const request = require('supertest');
const api = require('../../index');

describe('/api/users', () => {
  let payload;

  beforeEach(() => {
    payload = {
      name: 'aaaa',
      email: 'aaaa',
      password: 'aaaa',
    };
  });

  describe('POST /', () => {
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
  });
});

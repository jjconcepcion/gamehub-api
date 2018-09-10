const request = require('supertest');

describe('/api/users', () => {
  let api;

  beforeAll(() => {
    api = require('../../index'); // eslint-disable-line global-require
  });

  afterAll(async () => { await api.close(); });

  const payload = {
    name: 'aaaa',
    email: 'aaaa',
    password: 'aaaa',
  };

  describe('POST /', () => {
    it('should respond 200 status if request is valid', async () => {
      const res = await request(api)
        .post('/api/users')
        .send(payload);

      expect(res.status).toBe(200);
    });
  });
});

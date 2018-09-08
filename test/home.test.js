const request = require('supertest');

describe('GET /', async () => {
  let api;

  beforeAll(() => {
    api = require('..'); // eslint-disable-line global-require
  });

  afterAll(async () => { await api.close(); });

  it('should return 200 status', async () => {
    const res = await request(api).get('/');
    expect(res.status).toBe(200);
  });
});

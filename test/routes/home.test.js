const request = require('supertest');
const api = require('../../index');

describe('GET /', async () => {
  it('should return 200 status', async () => {
    const res = await request(api).get('/');
    expect(res.status).toBe(200);
  });
});

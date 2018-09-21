const request = require('supertest');
const api = require('../../index');

describe('POST method on /api/games', async () => {
  it('should return 200 if valid request', async () => {
    const res = await request(api).post('/api/games').send();

    expect(res.status).toBe(200);
  });
});
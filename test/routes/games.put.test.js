const request = require('supertest');
const api = require('../../index');

describe('PUT /api/games/:id', async () => {
  it('should return 200 if valid', async () => {
    const res = await request(api)
      .put('/api/games/1')
      .send();

    expect(res.status).toBe(200);
  });
});

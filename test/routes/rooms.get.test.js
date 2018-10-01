const request = require('supertest');
const api = require('../../');

describe('GET methods on /api/rooms', async () => {
  describe('GET list of games', async () => {
    it('should return 200 if valid', async () => {
      const res = await request(api)
        .get('/api/rooms');

      expect(res.status).toBe(200);
    });
  });
});

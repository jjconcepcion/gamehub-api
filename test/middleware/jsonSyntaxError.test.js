const request = require('supertest');
const api = require('../..');

describe('JSON syntax error handler', async () => {
  it('should return JSON error message', async () => {
    await request(api)
      .put('/api/games')
      .type('json')
      .send('{invalid}')
      .expect(400)
      .expect('Content-Type', /json/);
  });
});

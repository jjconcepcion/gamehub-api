const request = require('supertest');
const api = require('../../index');
const { User } = require('../../models/users');

describe('Authorization middleware', async () => {
  it('should return 401 if Authorization headers not present', async () => {
    const res = await request(api).get('/api/protected');

    expect(res.status).toBe(401);
  });

  it('should return 401 if not bearer authentication scheme', async () => {
    const res = await request(api)
      .get('/api/protected')
      .set('Authorization', 'a');

    expect(res.status).toBe(401);
  });

  it('should return 401 if auth token is invalid', async () => {
    const res = await request(api)
      .get('/api/protected')
      .set('Authorization', 'Bearer a');

    expect(res.status).toBe(401);
  });


  it('should return 200 if auth token is valid', async () => {
    const user = new User({
      name: 'aaa',
      email: 'a@mail.com',
      password: '12345678',
    });

    const token = await user.generateAuthToken();

    const res = await request(api)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});

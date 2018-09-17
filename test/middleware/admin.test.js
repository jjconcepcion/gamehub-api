const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const api = require('../../index');
const { User } = require('../../models/users');

describe('Admin middleware', async () => {
  let token;

  const privelegedRoute = () => request(api)
    .get('/api/admin')
    .set('Authorization', `Bearer ${token}`);

  it('should return 403 if not logged in as admin', async () => {
    token = await new User({
      name: 'aaa',
      email: 'a@mail.com',
      password: '12345678',
    }).generateAuthToken();

    const res = await privelegedRoute();

    expect(res.status).toBe(403);
  });

  it('should return 200 if logged in as admin', async () => {
    token = await jwt.sign({
      _id: 1,
      isAdmin: true,
    }, config.get('jwtPrivateKey'));

    const res = await privelegedRoute();

    expect(res.status).toBe(200);
  });
});

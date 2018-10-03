const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const api = require('../../index');

describe('DELETE /api/rooms/:id', async () => {
  let id;
  let token;
  let userToken;

  const generateUserToken = () => jwt.sign({
    _id: 1,
    isAdmin: false,
  }, config.get('jwtPrivateKey'));

  beforeAll(async () => {
    userToken = await generateUserToken();
  });

  beforeEach(() => {
    token = userToken;
  });

  const deleteRequest = () => request(api)
    .delete(`/api/rooms/${id}`)
    .set('Authorization', `Bearer ${token}`);

  it('should return 200 if valid', async () => {
    const res = await deleteRequest();

    expect(res.status).toBe(200);
  });

  it('should return 401 if not logged in', async () => {
    token = '';

    const res = await deleteRequest();

    expect(res.status).toBe(401);
  });
});

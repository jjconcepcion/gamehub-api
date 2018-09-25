const request = require('supertest');
const config = require('config');
const jwt = require('jsonwebtoken');
const api = require('../../index');

describe('DELETE /api/games/:id', async () => {
  let id;
  let token;
  let userToken;
  let adminToken;

  const generateUserToken = () => jwt.sign({
    _id: 1,
    isAdmin: false,
  }, config.get('jwtPrivateKey'));

  const generateAdminToken = () => jwt.sign({
    _id: 1,
    isAdmin: true,
  }, config.get('jwtPrivateKey'));

  beforeAll(async () => {
    const generateTokens = [
      generateUserToken(),
      generateAdminToken(),
    ];

    [userToken, adminToken] = await Promise.all(generateTokens);
  });

  beforeEach(() => {
    token = adminToken;
  });

  const deleteRequest = () => request(api)
    .delete(`/api/games/${id}`)
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

  it('should return 403 if not admin', async () => {
    token = userToken;

    const res = await deleteRequest();

    expect(res.status).toBe(403);
  });
});

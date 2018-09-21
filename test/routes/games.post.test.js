const request = require('supertest');
const config = require('config');
const jwt = require('jsonwebtoken');
const api = require('../../index');

describe('POST method on /api/games', async () => {
  let token;
  let adminToken;
  let userToken;
  let payload;

  beforeAll(async () => {
    const generateUserToken = () => jwt.sign({
      _id: 1,
      isAdmin: false,
    }, config.get('jwtPrivateKey'));
    const generateAdminToken = () => jwt.sign({
      _id: 1,
      isAdmin: true,
    }, config.get('jwtPrivateKey'));

    const generateTokens = [
      generateUserToken(),
      generateAdminToken(),
    ];

    [userToken, adminToken] = await Promise.all(generateTokens);
  });

  beforeEach(async () => {
    token = adminToken;

    payload = {
      name: 'aaa',
      description: 'lorem ipsum',
      minPlayers: 2,
      maxPlayers: 2,
    }
  });

  const postRequest = () => request(api)
    .post('/api/games')
    .set('Authorization', `Bearer ${token}`)
    .send(payload);

  it('should return 200 if valid request', async () => {
    const res = await postRequest();

    expect(res.status).toBe(200);
  });

  it('should return 401 if not logged in', async () => {
    token = '';

    const res = await postRequest();

    expect(res.status).toBe(401);
  });

  it('should return 403 if not an admin', async () => {
    token = userToken;

    const res = await postRequest();

    expect(res.status).toBe(403);
  });

  it('should return 400 if provided with invalid game properties', async () => {
    delete payload.name;
    const res = await postRequest();

    expect(res.status).toBe(400);
  });
});

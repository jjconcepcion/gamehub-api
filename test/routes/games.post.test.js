const request = require('supertest');
const config = require('config');
const jwt = require('jsonwebtoken');
const api = require('../../index');
const { Game, fields } = require('../../models/games');

describe('POST method on /api/games', async () => {
  let token;
  let adminToken;
  let userToken;
  let payload;

  const generateUserToken = () => jwt.sign({
    _id: 1,
    isAdmin: false,
  }, config.get('jwtPrivateKey'));

  const generateAdminToken = () => jwt.sign({
    _id: 1,
    isAdmin: true,
  }, config.get('jwtPrivateKey'));

  const cleanUpDb = () => Game.remove({});

  beforeAll(async () => {
    const generateTokens = [
      generateUserToken(),
      generateAdminToken(),
    ];

    [userToken, adminToken] = await Promise.all(generateTokens);
  });

  beforeEach(async () => {
    await cleanUpDb();

    token = adminToken;

    payload = {
      name: 'aaa',
      description: 'lorem ipsum',
      minPlayers: 2,
      maxPlayers: 2,
    };
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

  it('should return 409 if game name already in database', async () => {
    payload.name = 'exists';
    await new Game(payload).save();

    const res = await postRequest();

    expect(res.status).toBe(409);
  });

  it('should return saved game', async () => {
    const res = await postRequest();

    fields.forEach(p => expect(res.body).toHaveProperty(p));
  });

  it('should save game in database', async () => {
    const res = await postRequest();

    const saved = await Game.findOne({ _id: res.body._id });

    expect(saved).toBeTruthy();
  });
});

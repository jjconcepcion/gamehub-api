const request = require('supertest');
const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const api = require('../../index');
const { Game } = require('../../models/games');

describe('DELETE /api/games/:id', async () => {
  let id;
  let token;
  let userToken;
  let adminToken;
  let game;

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

  beforeEach(async () => {
    game = await (new Game({
      name: 'aaa',
      description: 'aaa',
      minPlayers: 1,
      maxPlayers: 2,
    })).save();

    token = adminToken;
  });

  afterEach(async () => {
    await Game.remove({});
  });

  const deleteRequest = () => request(api)
    .delete(`/api/games/${id}`)
    .set('Authorization', `Bearer ${token}`);

  it('should return 200 if valid', async () => {
    id = game._id;

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

  it('should return 404 if game id not in database', async () => {
    id = new mongoose.Types.ObjectId();

    const res = await deleteRequest();

    expect(res.status).toBe(404);
  });

  it('should return 404 if game id is not valid', async () => {
    id = 1;

    const res = await deleteRequest();

    expect(res.status).toBe(404);
  });
});

const request = require('supertest');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const api = require('../../index');
const { Game } = require('../../models/games');

describe('PUT /api/games/:id', async () => {
  let id;
  let token;
  let userToken;
  let adminToken;
  let data;
  let game;
  let payload;

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
    token = adminToken;

    data = {
      name: 'aaa',
      description: 'lorem ipsum',
      minPlayers: 2,
      maxPlayers: 2,
    };

    game = await new Game(data).save();

    id = game._id;
    payload = data;
  });

  const putRequest = () => request(api)
    .put(`/api/games/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(payload);

  it('should return 200 if valid', async () => {
    const res = await putRequest();

    expect(res.status).toBe(200);
  });

  it('should return 401 if not logged in', async () => {
    token = '';

    const res = await putRequest();

    expect(res.status).toBe(401);
  });

  it('should return 403 if not admin', async () => {
    token = userToken;

    const res = await putRequest();

    expect(res.status).toBe(403);
  });

  it('should return 404 if game not in database', async () => {
    id = new mongoose.Types.ObjectId();

    const res = await putRequest();

    expect(res.status).toBe(404);
  });

  it('should return 404 if not valid game id', async () => {
    id = 1;

    const res = await putRequest();

    expect(res.status).toBe(404);
  });

  it('should return 400 if name is not provided', async () => {
    delete payload.name;

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if description is not provided', async () => {
    delete payload.description;

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if minPlayers is not provided', async () => {
    delete payload.minPlayers;

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if maxPlayers is not provided', async () => {
    delete payload.maxPlayers;

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if name is shorter than 3 characters', async () => {
    payload.name = 'aa';

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 description is shorter than 3 characters', async () => {
    payload.description = 'aa';

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 minPlayers is less than 1', async () => {
    payload.minPlayers = 0;

    const res = await putRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 maxPlayers is less than minPlayers', async () => {
    payload.minPlayers = 2;
    payload.maxPlayers = 1;

    const res = await putRequest();

    expect(res.status).toBe(400);
  });
});

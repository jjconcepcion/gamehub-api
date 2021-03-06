const request = require('supertest');
const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const api = require('../..');
const { User } = require('../../models/users');
const { Game } = require('../../models/games');
const { Room, fields } = require('../../models/rooms');

describe('POST /api/rooms', async () => {
  let token;
  let userToken;
  let payload;
  let ownerId;
  let gameId;
  let existingRoom;

  const generateUserToken = () => jwt.sign({
    _id: 1,
    isAdmin: false,
  }, config.get('jwtPrivateKey'));

  const createUser = () => {
    const user = new User({
      name: 'user name',
      email: 'a@mail.com',
      password: '12345678',
    });
    return user.save();
  };

  const createGame = () => {
    const game = new Game({
      name: 'game name',
      description: 'Game description.',
      minPlayers: 2,
      maxPlayers: 2,
    });
    return game.save();
  };

  beforeAll(async () => {
    const preTestSetup = [
      generateUserToken(),
      createUser(),
      createGame(),
    ];

    [userToken, ownerId, gameId] = await Promise.all(preTestSetup);
  });

  beforeEach(async () => {
    token = userToken;

    payload = {
      name: 'room1',
      ownerId,
      gameId,
    };

    existingRoom = await (new Room({
      name: 'existing name',
      owner: payload.ownerId,
      game: payload.gameId,
    })).save();
  });

  afterEach(async () => {
    await Room.remove({});
  });

  afterAll(async () => {
    const cleanUpUsersAndGames = [
      User.remove({}),
      Game.remove({}),
    ];

    await Promise.all(cleanUpUsersAndGames);
  });
  const postRequest = () => request(api)
    .post('/api/rooms')
    .set('Authorization', `Bearer ${token}`)
    .send(payload);


  it('should return 200 if valid', async () => {
    const res = await postRequest();

    expect(res.status).toBe(200);
  });

  it('should return 401 logged in', async () => {
    token = '';

    const res = await postRequest();

    expect(res.status).toBe(401);
  });

  it('should return 400 if name not provided', async () => {
    delete payload.name;

    const res = await postRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if ownerId not provided', async () => {
    delete payload.ownerId;

    const res = await postRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if gameId not provided', async () => {
    delete payload.gameId;

    const res = await postRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if name is shorter than 3 characters', async () => {
    payload.name = 'aa';

    const res = await postRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if ownerId is invalid', async () => {
    payload.ownerId = 1;

    const res = await postRequest();

    expect(res.status).toBe(400);
  });

  it('should return 400 if gameId is invalid', async () => {
    payload.ownerId = 1;

    const res = await postRequest();

    expect(res.status).toBe(400);
  });

  it('should return 404 if owner not found', async () => {
    payload.ownerId = new mongoose.Types.ObjectId();

    const res = await postRequest();

    expect(res.status).toBe(404);
  });

  it('should return 404 if game not found', async () => {
    payload.gameId = new mongoose.Types.ObjectId();

    const res = await postRequest();

    expect(res.status).toBe(404);
  });

  it('should return room', async () => {
    const res = await postRequest();

    fields.forEach(p => expect(res.body).toHaveProperty(p));
  });

  it('should save the room in the database', async () => {
    const res = await postRequest();

    const roomInDb = await Room.findOne({ _id: res.body._id });

    fields.forEach(p => expect(roomInDb).toHaveProperty(p));
  });

  it('should return 409 if room name already exits', async () => {
    payload.name = existingRoom.name;

    const res = await postRequest();

    expect(res.status).toBe(409);
  });
});

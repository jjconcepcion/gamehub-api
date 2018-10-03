const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const api = require('../../index');
const { User } = require('../../models/users');
const { Game } = require('../../models/games');
const { Room } = require('../../models/rooms');

describe('DELETE /api/rooms/:id', async () => {
  let roomId;
  let userId;
  let gameId;
  let token;
  let userToken;

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

    [userToken, userId, gameId] = await Promise.all(preTestSetup);
  });

  beforeEach(async () => {
    token = userToken;

    const room = await (new Room({
      name: 'room1',
      owner: userId,
      game: gameId,
    })).save();

    roomId = room._id;
  });

  afterEach(async () => {
    await Room.remove({});
  });

  afterAll(async () => {
    await User.remove({});
    await Game.remove({});
  });

  const deleteRequest = () => request(api)
    .delete(`/api/rooms/${roomId}`)
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

  it('should return 400 if not valid room id', async () => {
    roomId = 1;

    const res = await deleteRequest();

    expect(res.status).toBe(400);
  });

  it('return 404 if room not found', async () => {
    roomId = new mongoose.Types.ObjectId();

    const res = await deleteRequest();

    expect(res.status).toBe(404);
  });

});

const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const api = require('../..');
const { User } = require('../../models/users');
const { Game } = require('../../models/games');
const { Room } = require('../../models/rooms');

describe('PUT /api/rooms/:id/players', async () => {
  let token;
  let userToken;
  let payload;
  let userId;
  let gameId;
  let room;
  let roomId;

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

    let user;
    let game;
    [userToken, user, game] = await Promise.all(preTestSetup);
    userId = user._id;
    gameId = game._id;

    room = await (new Room({
      name: 'Room',
      owner: userId,
      game: gameId,
    })).save();
  });

  beforeEach(async () => {
    token = userToken;

    payload = {
      userId,
    };

    roomId = room._id;
  });

  afterAll(async () => {
    const cleanup = [
      User.remove({}),
      Game.remove({}),
      Room.remove({}),
    ];

    await Promise.all(cleanup);
  });

  const putRequest = () => request(api)
    .put(`/api/rooms/${roomId}/players`)
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
});

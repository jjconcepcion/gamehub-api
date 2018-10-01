const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const api = require('../../');
const { Room, fields } = require('../../models/rooms');
const { User } = require('../../models/users');
const { Game } = require('../../models/games');

describe('GET methods on /api/rooms', async () => {
  let rooms;
  let token;
  let userToken;
  let userId;
  let gameId;
  let roomsInDb;

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
  });

  beforeEach(async () => {
    token = userToken;

    rooms = [
      {
        name: 'room1',
        owner: userId,
        game: gameId,
      },
      {
        name: 'room2',
        owner: userId,
        game: gameId,
      },
    ];

    roomsInDb = await Room.insertMany(rooms);
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

  const getRequest = id => request(api)
    .get(`/api/rooms/${id}`)
    .set('Authorization', `Bearer ${token}`);

  describe('GET list of rooms', async () => {
    it('should return 200 if valid', async () => {
      const res = await getRequest('');

      expect(res.status).toBe(200);
    });

    it('should return 401 if not logged in ', async () => {
      token = '';

      const res = await getRequest('');

      expect(res.status).toBe(401);
    });

    it('should return list of rooms', async () => {
      const res = await getRequest('');

      expect(res.body.length).toBe(2);
    });
  });


  describe('GET room details', async () => {
    let roomId;

    beforeEach(() => {
      roomId = roomsInDb[0]._id;
    });

    it('should return 401 if not logged in', async () => {
      token = '';

      const res = await getRequest(roomId);

      expect(res.status).toBe(401);
    });

    it('should return 200 if valid', async () => {
      const res = await getRequest(roomId);

      expect(res.status).toBe(200);
    });

    it('should return 200 if valid', async () => {
      const res = await getRequest(roomId);

      fields.forEach(p => expect(res.body).toHaveProperty(p));
    });
  });
});

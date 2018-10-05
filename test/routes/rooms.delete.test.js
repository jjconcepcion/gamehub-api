const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const api = require('../..');
const { User } = require('../../models/users');
const { Game } = require('../../models/games');
const { Room, fields} = require('../../models/rooms');

describe('DELETE /api/rooms/:id', async () => {
  let roomId;
  let userId;
  let gameId;
  let token;
  let ownerToken;

  const generateUserToken = id => jwt.sign({
    _id: id,
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
      createUser(),
      createGame(),
    ];

    const [user, game] = await Promise.all(preTestSetup);

    userId = user._id;
    gameId = game._id;

    ownerToken = await generateUserToken(userId);
  });

  beforeEach(async () => {
    token = ownerToken;

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

  it('return 403 if not the owner of the room', async () => {
    const nonOwnerId = new mongoose.Types.ObjectId();
    token = await generateUserToken(nonOwnerId);

    const res = await deleteRequest();

    expect(res.status).toBe(403);
  });

  it('should delete room from database', async () => {
    await deleteRequest();

    const room = await Room.findOne({ _id: roomId });

    expect(room).toBeNull();
  });

  it('should return the deleted room', async () => {
    const res = await deleteRequest();

    fields.forEach(p => expect(res.body).toHaveProperty(p));
  });
});

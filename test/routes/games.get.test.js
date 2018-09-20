const request = require('supertest');
const api = require('../../index');
const { Game } = require('../../models/games');

describe('GET methods on /api/games', () => {
  let games;
  let gamesInDb;

  beforeEach(async () => {
    games = [{
      name: 'aaa',
      description: 'lorem ipsum',
      minPlayers: 2,
      maxPlayers: 2,
    },
    {
      name: 'bbb',
      description: 'lorem ipsum',
      minPlayers: 2,
      maxPlayers: 2,
    }];

    gamesInDb = await Game.insertMany(games);
  });

  afterEach(async () => {
    await Game.remove({});
  });

  // GET /api/games
  describe('GET list of games', async () => {
    it('should return 200 status', async () => {
      const res = await request(api).get('/api/games');

      expect(res.status).toBe(200);
    });

    it('should return list of games', async () => {
      const res = await request(api).get('/api/games');

      expect(res.body.length).toBe(games.length);

      const properties = Object.keys(games[0]);
      properties.push('_id');

      res.body.forEach((game) => {
        properties.forEach(p => expect(game).toHaveProperty(p));
      });
    });
  });

  // GET /api/games/:id
  describe('Get game details', () => {
    it('shoud return 200 if valid request', async () => {
      const id = gamesInDb[0]._id;

      const res = await request(api).get(`/api/games/${id}`);

      expect(res.status).toBe(200);
    });
  });
});

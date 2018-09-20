const request = require('supertest');
const api = require('../../index');
const { Game } = require('../../models/games');

describe('GET methods on /api/games', () => {
  let games;

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

    await Game.insertMany(games);
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
});

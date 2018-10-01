const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');
const api = require('../../');
const { Rooms } = require('../../models/rooms');

describe('GET methods on /api/rooms', async () => {
  let rooms;
  let token;
  let userToken;

  const generateUserToken = () => jwt.sign({
    _id: 1,
    isAdmin: false,
  }, config.get('jwtPrivateKey'));

  const getRequest = () => request(api)
    .get('/api/rooms')
    .set('Authorization', `Bearer ${token}`);

  beforeAll(async () => {
    userToken = await generateUserToken();
  });

  beforeEach(async () => {
    token = userToken;
  });
  
  describe('GET list of games', async () => {
    it('should return 200 if valid', async () => {
      const res = await getRequest();

      expect(res.status).toBe(200);
    });

    it('should return 401 if not logged in ', async () => {
      token = '';

      const res = await getRequest();

      expect(res.status).toBe(401);
    });
  });
});

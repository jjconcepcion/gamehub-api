const request = require('supertest'); 
const config = require('config');
const jwt = require('jsonwebtoken');
const api =  require('../../index');

describe('POST /api/rooms', async () => {
  let token;
  let userToken;

  const generateUserToken = () => jwt.sign({
    _id: 1,
    isAdmin: false,
  }, config.get('jwtPrivateKey'));


  beforeAll(async () => {
    userToken = await generateUserToken();
  });

  beforeEach(() => {
    token = userToken;
  });

  const postRequest = () => request(api)
    .post('/api/rooms')
    .set('Authorization', `Bearer ${token}`);


  it('should return 200 if valid', async () => {
    const res = await postRequest();

    expect(res.status).toBe(200);
  });

  it('should return 401 logged in', async () => {
    token = '';

    const res = await postRequest();

    expect(res.status).toBe(401);
  });

});
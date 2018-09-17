const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send({ error: 'missing authorization token' });
  }

  let scheme; let token;
  try {
    [scheme, token] = authHeader.split(' ');
  } catch (e) {
    return res.status(402).send({ error: 'invalid authorization token' });
  }

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).send({ error: 'invalid authorization token' });
  }

  jwt.verify(token, config.get('jwtPrivateKey'), (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'invalid authorization token' });
    }

    req.user = decoded;
    next();
  });

  return undefined;
}

module.exports = auth;

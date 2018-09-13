const express = require('express');
const config = require('config');
const logger = require('./init/logger');
const connectToDatabase = require('./init/db');
const home = require('./routes/home');
const users = require('./routes/users');
const login = require('./routes/login');

const app = express();

connectToDatabase();

app.use(express.json());

app.use('/', home);
app.use('/api/users', users);
app.use('/api/login', login);

const port = process.env.PORT || config.get('listenPort');

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => logger.info(`Listening on port ${port}.`));
}

if (!config.get('jwtPrivateKey')) {
  throw new Error('jwtPrivateKey not defined');
}

module.exports = app;

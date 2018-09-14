const express = require('express');
const config = require('config');
const logger = require('./init/logger');
const connectToDatabase = require('./init/db');
const useRoutes = require('./routes');

const app = express();

connectToDatabase();
useRoutes(app);

const port = process.env.PORT || config.get('listenPort');

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => logger.info(`Listening on port ${port}.`));
}

if (!config.get('jwtPrivateKey')) {
  throw new Error('jwtPrivateKey not defined');
}

module.exports = app;

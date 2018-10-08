const express = require('express');
const config = require('config');
const productionMiddleware = require('./middleware/production');
const logger = require('./init/logger');
const connectToDatabase = require('./init/db');
const useRoutes = require('./routes');
const checkEnvironmentVariables = require('./init/config');

const app = express();

checkEnvironmentVariables();
connectToDatabase();
useRoutes(app);
productionMiddleware(app);


const port = process.env.PORT || config.get('listenPort');

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => logger.info(`Listening on port ${port}.`));
}

module.exports = app;

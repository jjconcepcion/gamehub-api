const express = require('express');
const config = require('config');
const logger = require('./init/logger');
const connectToDatabase = require('./init/db');

const app = express();

connectToDatabase();

app.get('/', (req, res) => res.send('gamehub-api'));

const port = process.env.PORT || config.get('listenPort');
const server = app.listen(port, () => logger.info(`Listening on port ${port}.`));

module.exports = server;

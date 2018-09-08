const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const logger = require('./init/logger');

const app = express();
app.get('/', (req, res) => res.send('gamehub-api'));

const db = config.get('db');
mongoose.connect(db).then(() => logger.info(`Connected to ${db}`));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}.`));

module.exports = server;

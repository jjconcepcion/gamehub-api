const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

const app = express();

app.get('/', (req, res) => res.send('gamehub-api'));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'gamehub-api-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'gamehub-api-combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

const db = config.get('db');
mongoose.connect(db).then(() => logger.info(`Connected to ${db}`));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}.`));

module.exports = server;

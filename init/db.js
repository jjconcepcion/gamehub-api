const mongoose = require('mongoose');
const config = require('config');
const logger = require('./logger');

function connect() {
  const db = config.get('db');
  mongoose.connect(db, { useNewUrlParser: true })
    .then(() => logger.info(`Connected to ${db}`));
}

module.exports = connect;

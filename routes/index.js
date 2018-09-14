const express = require('express');
const home = require('./home');
const users = require('./users');
const login = require('./login');

module.exports = function initializeRoutes(app) {
  app.use(express.json());
  app.use('/', home);
  app.use('/api/users', users);
  app.use('/api/login', login);
};

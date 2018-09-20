const express = require('express');
const home = require('./home');
const users = require('./users');
const login = require('./login');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const games = require('./games');

module.exports = function initializeRoutes(app) {
  app.use(express.json());
  app.use('/', home);
  app.use('/api/users', users);
  app.use('/api/login', login);
  app.use('/api/games', games);

  // test route for auth middleware
  app.use('/api/protected', auth, home);
  // test route for admin middleware
  app.use('/api/admin', auth, admin, home);
};

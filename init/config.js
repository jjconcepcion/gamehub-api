const config = require('config');

module.exports = function checkEnvironmentVariables() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('jwtPrivateKey not defined');
  }
};

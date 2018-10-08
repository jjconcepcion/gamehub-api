const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet());
  app.disable('x-powered-by');
}
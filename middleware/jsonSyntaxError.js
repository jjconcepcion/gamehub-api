module.exports = function syntaxErrorHandler(err, _req, res, next) {
  if (err instanceof SyntaxError) {
    res.status(400).send({ error: 'invalid JSON syntax' });
  } else {
    next();
  }
};

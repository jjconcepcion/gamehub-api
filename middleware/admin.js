function admin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({ error: 'Access denied' });
  }
}

module.exports = admin;

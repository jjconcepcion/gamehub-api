const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: 'name: not provided' });
  }

  if (!req.body.password) {
    return res.status(400).send({ error: 'password: not provided' });
  }

  const user = await User.findOne({ name: req.body.name });

  if (!user) {
    return res.status(404).send({ error: 'name: not found' });
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    return res.status(400).send({ error: 'password: invalid password' });
  }

  return res.send();
});

module.exports = router;

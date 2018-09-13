const express = require('express');
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

  return res.send();
});

module.exports = router;

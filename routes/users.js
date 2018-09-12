const express = require('express');
const { User } = require('../models/users');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find({}).sort('name');
  res.send(users);
});

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const checkUserExists = [
    User.findOne({ email: req.body.email }).select('email'),
    User.findOne({ name: req.body.name }).select('name'),
  ];

  const results = await Promise.all(checkUserExists);
  if (results[0]) {
    return res.status(409).send({ error: 'email: is already registered' });
  }
  if (results[1]) {
    return res.status(409).send({ error: 'name: is unavailable' });
  }

  try { // to create user
    const result = await user.save();
    await user.save();
    res.send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }

  return undefined;
});

module.exports = router;

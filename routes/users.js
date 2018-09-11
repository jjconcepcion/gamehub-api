const express = require('express');
const { User } = require('../models/users');

const router = express.Router();

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
    return res.status(409).send('User with email already exists');
  }
  if (results[1]) {
    return res.status(409).send('Username with  already exists');
  }

  try {// to create user
    const result = await user.save();
    await user.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }

  return undefined;
});

module.exports = router;

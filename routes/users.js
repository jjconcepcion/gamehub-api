const express = require('express');
const { User } = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const emailExists = await User.findOne({ email: req.body.email }).select('email');
  if (emailExists) {
    return res.status(409).send('User with email already exists');
  }

  const nameExists = await User.findOne({ name: req.body.name }).select('name');
  if (nameExists) {
    return res.status(409).send('Username with  already exists');
  }

  try {
    const result = await user.save();
    await user.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }

  return undefined;
});

module.exports = router;

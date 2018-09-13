const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/users');

const router = express.Router();

// G list of users
router.get('/', async (req, res) => {
  const users = await User.find({}).sort('name');
  res.send(users);
});

// Get a user's details
router.get('/:id', async (req, res) => {
  const validObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validObjectId) {
    return res.status(400).send({ error: '_id: invalid syntax' });
  }

  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return res.status(404).send({ error: '_id: user not found' });
  }
  return res.send(user);
});

// Create a user
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

    const token = await user.generateAuthToken();
    res.append('Authorization', `Bearer ${token}`);

    res.send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }

  return undefined;
});

module.exports = router;

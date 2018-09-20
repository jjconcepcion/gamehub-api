const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// G list of users
router.get('/', auth, admin, async (req, res) => {
  const users = await User.find({})
    .sort('name')
    .select('_id name email');
  res.send(users);
});

// Get a user's details
router.get('/:id', auth, admin, async (req, res) => {
  const validObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validObjectId) {
    return res.status(400).send({ error: '_id: invalid syntax' });
  }

  const user = await User.findOne({ _id: req.params.id })
    .select('_id name email');

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

  try {
    await user.validate();
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }

  const userLookup = [
    User.findOne({ email: req.body.email }).select('email'),
    User.findOne({ name: req.body.name }).select('name'),
  ];

  const [email, name] = await Promise.all(userLookup);

  if (email) {
    return res.status(409).send({ error: 'email: is already registered' });
  }
  if (name) {
    return res.status(409).send({ error: 'name: is unavailable' });
  }

  // genereate hash from plaintext password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  // create user in database
  user.password = hashedPassword;
  await user.save();

  // return auth token
  const token = await user.generateAuthToken();
  res.append('Authorization', `Bearer ${token}`);

  return res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

router.delete('/:id', auth, admin, async (req, res) => {
  let deleted;
  try {
    deleted = await User.findByIdAndRemove(req.params.id)
      .select('_id name email');
  } catch (err) {
    if (err.name === 'CastError') {
      // treat syntactically invalid id as nonexistent
      deleted = false;
    }
  }

  if (!deleted) {
    return res.status(404).send({ error: 'user not found' });
  }

  return res.send(deleted);
});

router.put('/:id', auth, async (req, res) => {
  // not authenticated as the user being updated
  if (req.user._id !== req.params.id) {
    return res.status(403).send({ error: 'access denied' });
  }

  let user = await User.findById(req.params.id);

  // user record not found in database
  if (!user) {
    return res.status(404).send({ error: 'user not found' });
  }

  const oldEmail = user.email;
  user.email = req.body.email;
  try {
    await user.validate();
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists && req.body.email !== oldEmail) {
    return res.status(409).send({ error: 'email: is already registered' });
  }

  user = await user.save();

  return res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = router;

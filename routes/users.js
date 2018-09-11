const express = require('express');
const { User } = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const result = await user.save();
    await user.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

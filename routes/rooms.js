const express = require('express');
const auth = require('../middleware/auth');
const { Room } = require('../models/rooms');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const rooms = await Room.find({});

  res.send(rooms);
});

module.exports = router;

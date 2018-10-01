const express = require('express');
const auth = require('../middleware/auth');
const { Room } = require('../models/rooms');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const rooms = await Room.find({});

  res.send(rooms);
});

router.get('/:id', auth, async (req, res) => {
  const roomInDb = await Room.findOne({ _id: req.params.id });

  res.send(roomInDb);
});
module.exports = router;

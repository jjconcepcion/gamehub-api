const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Room } = require('../models/rooms');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const rooms = await Room.find({});

  res.send(rooms);
});

router.get('/:id', auth, async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(400).send({ error: '_id: invalid syntax' });
  }

  const roomInDb = await Room.findOne({ _id: req.params.id });

  if (!roomInDb) {
    return res.status(404).send({ error: '_id: room not found' });
  }

  return res.send(roomInDb);
});
module.exports = router;

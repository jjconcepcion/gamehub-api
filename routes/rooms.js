const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Room } = require('../models/rooms');
const { User } = require('../models/users');
const { Game } = require('../models/games');

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

router.post('/', auth, async (req, res) => {
  const room = new Room({
    name: req.body.name,
    owner: req.body.ownerId,
    game: req.body.gameId,
  });

  try {
    await room.validate();
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }

  const lookUpOwnerAndGame = [
    User.findOne({ _id: req.body.ownerId }),
    Game.findOne({ _id: req.body.gameId }),
  ];

  const [ownerInDb, gameInDb] = await Promise.all(lookUpOwnerAndGame);

  if (!ownerInDb) {
    return res.status(404).send({ error: 'ownerId: not found' });
  }

  if (!gameInDb) {
    return res.status(404).send({ error: 'gameId: not found' });
  }

  return res.send();
});
module.exports = router;

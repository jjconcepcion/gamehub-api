const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { Room } = require('../models/rooms');
const { User, shortFields: userShortFields } = require('../models/users');
const { Game, shortFields: gameShortFields } = require('../models/games');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const rooms = await Room.find({})
    .populate('owner', userShortFields)
    .populate('game', gameShortFields);

  res.send(rooms);
});

router.get('/:id', auth, async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(400).send({ error: '_id: invalid syntax' });
  }

  const roomInDb = await Room.findOne({ _id: req.params.id })
    .populate('owner', userShortFields)
    .populate('game', gameShortFields);


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

  const lookUpOwnerAndGameAndRoom = [
    User.findOne({ _id: req.body.ownerId }),
    Game.findOne({ _id: req.body.gameId }),
    Room.findOne({ name: req.body.name }),
  ];

  const [ownerInDb, gameInDb, roomExists] = await Promise.all(lookUpOwnerAndGameAndRoom);

  if (!ownerInDb) {
    return res.status(404).send({ error: 'ownerId: not found' });
  }

  if (!gameInDb) {
    return res.status(404).send({ error: 'gameId: not found' });
  }

  if (roomExists) {
    return res.status(409).send({ erro: 'name: unavailable' });
  }

  const savedRoom = await room.save();

  return res.send(savedRoom);
});

router.delete('/:id', auth, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!validId) {
    return res.status(400).send({ error: '_id: invalid syntax' });
  }

  const roomInDb = await Room.findOne({ _id: req.params.id });

  if (!roomInDb) {
    return res.status(404).send({ error: 'room not found ' });
  }

  if (!roomInDb.owner._id.equals(req.user._id)) {
    return res.status(403).send({ error: 'access denied' });
  }

  await Room.remove({ _id: req.params.id });

  return res.send(roomInDb);
});

router.put('/:id/players', auth, (req, res) => res.send());
module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const { Game, fields } = require('../models/games');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
  const games = await Game.find({})
    .sort('name')
    .select(fields.join(' '));

  res.send(games);
});

router.get('/:id', async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!validId) {
    return res.status(400).send({ error: '_id: invalid syntax' });
  }

  const game = await Game.findOne({ _id: req.params.id })
    .select(fields.join(' '));

  if (!game) {
    return res.status(404).send({ error: '_id: game not found' });
  }

  return res.send(game);
});

router.post('/', auth, admin, async (req, res) => {
  let game = new Game({
    name: req.body.name,
    description: req.body.description,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
  });

  try {
    await game.validate();
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }


  const gameInDb = await Game.findOne({ name: req.body.name });

  if (gameInDb) {
    return res.status(409).send({ error: 'name: already exists' });
  }

  game = await game.save();

  return res.send(game);
});

router.put('/:id', auth, admin, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validId) {
    return res.status(404).send({ error: '_id: game not found' });
  }

  const gameInDb = await Game.findOne({ _id: req.params.id });

  if (!gameInDb) {
    return res.status(404).send({ error: '_id: game not found' });
  }

  gameInDb.name = req.body.name;
  gameInDb.description = req.body.description;
  gameInDb.minPlayers = req.body.minPlayers;
  gameInDb.maxPlayers = req.body.maxPlayers;

  try {
    await gameInDb.validate();
  } catch (err) {
    return res.status(400).send(err.message);
  }

  const updatedGame = await gameInDb.save();

  return res.send(updatedGame);
});

router.delete('/:id', auth, admin, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!validId) {
    return res.status(404).send({ error: '_id: game not found' });
  }
  const gameInDb = await Game.findOne({ _id: req.params.id });

  if (!gameInDb) {
    return res.status(404).send({ error: '_id: game not found' });
  }

  const deleted = await Game.findByIdAndRemove(req.params.id);

  return res.send(deleted);
});

module.exports = router;

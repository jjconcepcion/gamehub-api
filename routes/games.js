const express = require('express');
const mongoose = require('mongoose');
const { Game, fields } = require('../models/games');

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

router.post('/', (req, res) => {
  res.send();
})


module.exports = router;

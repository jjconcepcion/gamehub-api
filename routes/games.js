const express = require('express');
const mongoose = require('mongoose');
const { Game } = require('../models/games');

const router = express.Router();

router.get('/', async (req, res) => {
  const games = await Game.find({})
    .sort('name')
    .select('_id name description minPlayers maxPlayers');

  res.send(games);
});

router.get('/:id', async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);

  if(!validId) {
    return res.status(400).send({ error: '_id: invalid syntax' });
  }

  res.send();
});


module.exports = router;

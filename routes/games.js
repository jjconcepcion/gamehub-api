const express = require('express');
const { Game } = require('../models/games');

const router = express.Router();

router.get('/', async (req, res) => {
  const games = await Game.find({})
    .sort('name')
    .select('_id name description minPlayers maxPlayers');

  res.send(games);
});

router.get('/:id', async (req, res) => {
  res.send();
});


module.exports = router;

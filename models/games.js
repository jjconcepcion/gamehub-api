const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'must be at least 3 characters in length'],
  },
  description: {
    type: String,
    required: true,
    minlength: [3, 'must be at least 3 characters in length'],
  },
  minPlayers: {
    type: Number,
    required: true,
    min: [1, 'must be at least 1 player'],
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: [1, 'must be at least 1 player'],
    validate: {
      validator(value) {
        return this.minPlayers <= value;
      },
      message: 'must be greater than or equal to minPlayers',
    },
  },
});

module.exports.Game = mongoose.model('Game', gamesSchema);
module.exports.fields = Object.keys(gamesSchema.paths);

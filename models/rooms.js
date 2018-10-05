const mongoose = require('mongoose');


const roomsSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'must be at least 3 characters in length'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports.Room = mongoose.model('Room', roomsSchema);
module.exports.fields = Object.keys(roomsSchema.paths);

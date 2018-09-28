const mongoose = require('mongoose');


const roomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  }
});

module.exports.Room = mongoose.model('Room', roomsSchema);

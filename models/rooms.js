const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports.Room = mongoose.model('Room', roomsSchema);
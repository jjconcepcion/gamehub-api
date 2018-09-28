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
});

module.exports.Room = mongoose.model('Room', roomsSchema);

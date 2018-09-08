const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports.User = mongoose.model('User', userSchema);

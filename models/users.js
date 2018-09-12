const mongoose = require('mongoose');


function validateEmail(email) {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'must be at least 3 characters in length'],
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: validateEmail,
      message: 'invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'must be at leat 8 characters in length'],
  },
});


module.exports.User = mongoose.model('User', userSchema);

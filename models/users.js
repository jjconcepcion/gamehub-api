const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


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
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Returns a Promise which resolves a signed JSONWebToken or rejects with
// and error
userSchema.methods.generateAuthToken = function generateAuthToken() {
  return new Promise((resolve, reject) => {
    jwt.sign({
      _id: this._id,
      isAdmin: this.isAdmin,
    }, config.get('jwtPrivateKey'), (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports.User = mongoose.model('User', userSchema);

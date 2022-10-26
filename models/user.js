const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  EMAIL_FORMAT_ERROR_TEXT,
  WRONG_AUTH_DATA_TEXT,
} = require('../constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: EMAIL_FORMAT_ERROR_TEXT,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError(WRONG_AUTH_DATA_TEXT);
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(WRONG_AUTH_DATA_TEXT);
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);

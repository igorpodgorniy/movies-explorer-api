require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const { LOCAL_JWT_SECRET } = require('../constants/constants');
const {
  USER_NOT_FOUND_TEXT,
  INCORRECT_DATA_TEXT,
  SUCCESS_AUTH_TEXT,
  CONFLICT_USER_TEXT,
} = require('../constants/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

function signUser(user, res) {
  const token = jwt.sign(
    { _id: user._id },
    NODE_ENV === 'production' ? JWT_SECRET : LOCAL_JWT_SECRET,
    { expiresIn: '7d' },
  );

  res.cookie('token', token, {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
  });
  res.send({
    data: {
      name: user.name,
      email: user.email,
    },
    message: SUCCESS_AUTH_TEXT,
  });
}

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_TEXT);
    })
    .then((user) => res.send(user))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(INCORRECT_DATA_TEXT));
      }
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_USER_TEXT));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      signUser(user, res);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      signUser(user, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(INCORRECT_DATA_TEXT));
      }
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_USER_TEXT));
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  updateProfile,
  login,
  createUser,
};

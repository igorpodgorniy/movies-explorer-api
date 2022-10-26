require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { LOCAL_JWT_SECRET } = require('../constants/constants');
const { LOGIN_REQUIRED_TEXT } = require('../constants/errors');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production'
      ? JWT_SECRET
      : LOCAL_JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(LOGIN_REQUIRED_TEXT));
  }

  req.user = payload;

  return next();
};

module.exports = auth;

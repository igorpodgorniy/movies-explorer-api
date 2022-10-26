const { DEFAULT_ERROR, DEFAULT_ERROR_TEXT } = require('../constants/errors');

const errorsProcessing = ((err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR
        ? DEFAULT_ERROR_TEXT
        : message,
    });

  next();
});

module.exports = errorsProcessing;

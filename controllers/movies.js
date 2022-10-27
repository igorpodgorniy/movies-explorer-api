const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  INCORRECT_DATA_TEXT,
  MOVIE_NOT_FOUND_TEXT,
  NOT_DELETE_MOVIE_TEXT,
  MOVIE_DELETE_TEXT,
} = require('../constants/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(INCORRECT_DATA_TEXT));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(MOVIE_NOT_FOUND_TEXT);
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(NOT_DELETE_MOVIE_TEXT));
      }
      return movie.remove().then(() => res.send({
        message: MOVIE_DELETE_TEXT,
      }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../constants/constants');
const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

// Возвращаем все сохранённые текущим  пользователем фильмы
routerMovies.get('/', getMovies);

// Сохраняем в избранное фильм с переданными в теле параметрами
routerMovies.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regExp).required(),
    trailerLink: Joi.string().pattern(regExp).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(regExp).required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

// Удаляем сохранённый фильм по id
routerMovies.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = routerMovies;

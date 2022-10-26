const routerMovies = require('express').Router();
const { movieParamsValidation, movieIdValidation } = require('../middlewares/validation');
const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

// Возвращаем все сохранённые текущим  пользователем фильмы
routerMovies.get('/', getMovies);

// Сохраняем в избранное фильм с переданными в теле параметрами
routerMovies.post('/', movieParamsValidation, createMovie);

// Удаляем сохранённый фильм по id
routerMovies.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = routerMovies;

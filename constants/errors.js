const DEFAULT_ERROR = 500;
const VALIDATION_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
// тесты ответов от сервера
const LOGIN_REQUIRED_TEXT = 'Необходима авторизация';
const DEFAULT_ERROR_TEXT = 'На сервере произошла ошибка';
const INCORRECT_DATA_TEXT = 'Были отправлены некорректные данные';
const MOVIE_NOT_FOUND_TEXT = 'Фильма с указанным id не существует';
const NOT_DELETE_MOVIE_TEXT = 'Вы не можете удалить чужой фильм';
const MOVIE_DELETE_TEXT = 'Фильм удалён из избранного';
const USER_NOT_FOUND_TEXT = 'Пользователь с указанным id не существует';
const SUCCESS_AUTH_TEXT = 'Авторизация прошла успешно';
const CONFLICT_USER_TEXT = 'Пользователь с указанным email уже существует';
const EMAIL_FORMAT_ERROR_TEXT = 'Электронная почта не соответствует формату';
const URL_FORMAT_ERROR_TEXT = 'Не является ссылкой';
const WRONG_AUTH_DATA_TEXT = 'Неправильные почта или пароль';
const NOT_FOUND_PAGE_TEXT = 'Такой страницы не существует';
const EXIT_TEXT = 'Выход';

module.exports = {
  DEFAULT_ERROR,
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  LOGIN_REQUIRED_TEXT,
  DEFAULT_ERROR_TEXT,
  INCORRECT_DATA_TEXT,
  MOVIE_NOT_FOUND_TEXT,
  NOT_DELETE_MOVIE_TEXT,
  MOVIE_DELETE_TEXT,
  USER_NOT_FOUND_TEXT,
  SUCCESS_AUTH_TEXT,
  CONFLICT_USER_TEXT,
  EMAIL_FORMAT_ERROR_TEXT,
  URL_FORMAT_ERROR_TEXT,
  WRONG_AUTH_DATA_TEXT,
  NOT_FOUND_PAGE_TEXT,
  EXIT_TEXT,
};

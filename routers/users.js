const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

// Возвращаем информацию о пользователе (email и имя)
routerUsers.get('/me', getCurrentUser);

// Обновляем информацию о пользователе (email и имя)
routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

module.exports = routerUsers;

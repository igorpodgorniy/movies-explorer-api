const routerUsers = require('express').Router();
const { userParamsValidation } = require('../middlewares/validation');
const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

// Возвращаем информацию о пользователе (email и имя)
routerUsers.get('/me', getCurrentUser);

// Обновляем информацию о пользователе (email и имя)
routerUsers.patch('/me', userParamsValidation, updateProfile);

module.exports = routerUsers;

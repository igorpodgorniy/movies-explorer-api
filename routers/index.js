const router = require('express').Router();
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const { login, createUser } = require('../controllers/users');
const { NOT_FOUND_PAGE_TEXT, EXIT_TEXT } = require('../constants/errors');
const { signInValidation, signUpValidation } = require('../middlewares/validation');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('token').send({ message: EXIT_TEXT });
});

router.use(auth);

router.use('/users', routerUsers);
router.use('/movies', routerMovies);

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_TEXT));
});

module.exports = router;

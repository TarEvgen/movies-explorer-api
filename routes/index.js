const router = require('express').Router();

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');

const {
  login,
  createUser
} = require('../controllers/users');

const userRoutes = require('./users');
const moviesRoutes = require('./movies');

const {
  checkBodyLogin,
} = require('../middlewares/validation');

router.post('/signin', checkBodyLogin, login);
router.post('/signup', checkBodyLogin, createUser);




router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
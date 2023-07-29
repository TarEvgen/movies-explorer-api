const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  login,
  createUser
} = require('../controllers/users');

const userRoutes = require('./users');
const moviesRoutes = require('./movies');

router.post('/signin', /* checkBodyLogin,*/ login);
router.post('/signup', /* checkBodyLogin,*/ createUser);




router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
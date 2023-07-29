const router = require('express').Router();

const {
  login,
  createUser
} = require('../controllers/users');

router.post('/signin', /* checkBodyLogin,*/ login);
router.post('/signup', /* checkBodyLogin,*/ createUser);


const userRoutes = require('./users');
const moviesRoutes = require('./movies');

router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
const router = require('express').Router();

const {
  createMovies,
  getMovies,
  deleteMoviesById
} = require('../controllers/movies');

router.get('', getMovies)
router.post('', createMovies);
router.delete('/:_id', deleteMoviesById);

module.exports = router;

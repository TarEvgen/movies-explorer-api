const router = require('express').Router();

const {
  createMovies,
  getMovies,
  deleteMoviesById,
} = require('../controllers/movies');

const {
  checkBodyMovie,
  checkParamsId,
} = require('../middlewares/validation');

router.get('', getMovies);
router.post('', checkBodyMovie, createMovies);
router.delete('/:_id', checkParamsId, deleteMoviesById);

module.exports = router;

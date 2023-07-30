const Movies = require('../models/movie');

const BedRequest = require('../errors/bed-request');
const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden');

const getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
};

const createMovies = (req, res, next) => {
  const newMoviesData = req.body;
  return Movies.create({
    country: newMoviesData.country,
    director: newMoviesData.director,
    duration: newMoviesData.duration,
    year: newMoviesData.year,
    description: newMoviesData.description,
    image: newMoviesData.image,
    trailerLink: newMoviesData.trailerLink,
    trailer: newMoviesData.trailer,
    owner: req.user.id,
    nameRU: newMoviesData.nameRU,
    nameEN: newMoviesData.nameEN,
    thumbnail: newMoviesData.thumbnail,
    movieId: newMoviesData.movieId,
  })
    .then((newMovies) => {
      res.status(201).send(newMovies);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны не корректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMoviesById = (req, res, next) => {
  const { _id } = req.params;
  Movies.findById(_id)
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (movies.owner.toString() !== req.user.id) {
        throw new Forbidden('Вы не можете удалять чужие фильмы');
      } else {
        return Movies.findByIdAndRemove(_id).then(() => {
          res.send({ messege: 'Карточка удалена' });
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны не корректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovies,
  getMovies,
  deleteMoviesById,
};

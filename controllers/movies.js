const Movies = require('../models/movie')



const getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
};


const createMovies = (req, res, next) => {
  const newMoviesData = req.body;
  console.log(req, 'req')
  const owner = req.user.id;
  return Movies.create({
    country: newMoviesData.country,
    director: newMoviesData.director,
    duration: newMoviesData.duration,
    year: newMoviesData.year,
    description: newMoviesData.description,
    image: newMoviesData.image,
    trailer: newMoviesData.trailer,

    owner: owner,

    nameRU: newMoviesData.nameRU,

    nameEN: newMoviesData.nameEN,

    thumbnail: newMoviesData.thumbnail,

    movieId: newMoviesData.movieId,


  })
    .then((newMovies) => {
      res.status(201).send(newMovies);
    })

    /*
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны не корректные данные'));
      } else {
        next(err);
      }
    });*/
};

/////////////////////////////////
const deleteMoviesById = (req, res, next) => {
  const { _id } = req.params;
console.log(_id)
Movies.findById(_id)
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Карточка не найдена');
      }
      /*
      if (movies.owner.toString() !== req.user.id) {
        throw new Forbidden('Вы не можете удалять чужие карточки');
      } */

      else {
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


///////////////////////////////////


module.exports = {

  createMovies,
  getMovies,
  deleteMoviesById

};
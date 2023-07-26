const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (data) => validator.isURL(data),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (data) => validator.isURL(data),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (data) => validator.isURL(data),
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('movie', movieSchema);
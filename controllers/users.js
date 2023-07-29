
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const saltRounds = 10;

const {
  secretJwt,
} = require('../utils/variableEvn');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      }

      bcrypt.compare(
        password,
        user.password,
        (err, isPasswordValue) => {
          if (!isPasswordValue) {
            next(new Unauthorized('Неправильные почта или пароль'));
          } else {
            const token = jwt.sign({ id: user._id }, secretJwt, {
              expiresIn: '7d',
            });
            res.send({ token });
          }
        },
      );
    })
    .catch((err) => next(err));
};

/*
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

*/

const createUser = (req, res, next) => {
  const {
    email, password, name
  } = req.body;
  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({
      email, password: hash, name
    })
      .then((newUser) => {
        res.status(201).send({
          name: newUser.name,
          email: newUser.email,
          _id: newUser._id,
        });
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь уже существует'));
        return;
      }
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
};


const getUser = (req, res) => {
  console.log(req.user.id, 'req.user.id getUser')
  User.findById(req.user.id).then((user) => {
    res.send(user);
  });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  })

    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны некорректные данные'));
        return;
      }
      next(err);
    });
};




module.exports = {
  /*getUsers,*/

  getUser,

  createUser,

  login,
  updateUser

};
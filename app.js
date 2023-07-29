const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { errors } = require('celebrate');
const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb').then(() => {c=console.log('к бд подкючен')});
app.use(bodyParser.json());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});




app.listen(3000)
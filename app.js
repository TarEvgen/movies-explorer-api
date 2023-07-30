require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const cors = require('cors');

const { errors } = require('celebrate');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes');

app.use(cors());

const {
  dataBase,
} = require('./utils/variableEvn');

const { PORT = 3000 } = process.env;

mongoose.connect(dataBase);
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

app.listen(PORT, () => {});

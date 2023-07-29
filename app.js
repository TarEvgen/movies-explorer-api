const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app = express()

const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb').then(() => {c=console.log('к бд подкючен')});
app.use(bodyParser.json());

app.use(routes);





app.listen(3000)
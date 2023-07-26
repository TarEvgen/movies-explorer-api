const express = require('express');
const mongoose = require('mongoose');
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb').then(() => {c=console.log('к бд подкючен')});

app.get('/', function (req, res) {
  res.send('Hello World')
  console.log('server!!!!!!!!!!')
})

app.listen(3000)
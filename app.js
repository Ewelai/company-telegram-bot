require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const telegramBot = require('./bot/bot');

app.use(bodyParser.json());
app.use(cors());

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({error: err});
});

app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port 3001!');
});

module.exports = app;
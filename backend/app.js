const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', require('./routes'));

app.listen(2000, function () {
    console.log('Server started on http://localhost:2000/')
});

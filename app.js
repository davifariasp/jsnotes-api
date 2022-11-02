require ('./config/database')

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')

var usersRouter = require('./app/routes/users');
var notesRouter = require('./app/routes/notes');

const port = process.env.PORT || 3001

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()) //habilitando cors

app.use('/users', usersRouter);
app.use('/notes', notesRouter);

module.exports = app;

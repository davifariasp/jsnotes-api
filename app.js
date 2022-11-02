require ('./config/database')

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')

var usersRouter = require('./app/routes/users');
var notesRouter = require('./app/routes/notes');

var app = express();

var port = process.env.PORT || '3001'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()) //habilitando cors

app.use('/users', usersRouter);
app.use('/notes', notesRouter);

app.listen(port, () => console.log(`Servidor disponível em http://localhost:${port}`));

module.exports = app;

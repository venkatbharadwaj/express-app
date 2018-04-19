var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');//Using morgan for logging
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost/firefly');


app.use(logger('dev', {
  skip: function (req, res) {
    return res.statusCode < 400
}, stream: process.stderr
}));
app.use(logger('dev', {
  skip: function (req, res) {
    return res.statusCode >= 400
}, stream: process.stdout
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);//default routes goes here
app.use('/users', users);//all user related routes goes here

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  logger.error('404 page requested');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;

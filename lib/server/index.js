/**
  * Module dependencies.
  */
var debugs = require('./debugs');
var express = require('express');
var join = require('path').join;
var config = require('../../config');
global.mongo = require('./db');

// app

var app = module.exports = express();

// settings

app.configure('development', function(){
  app.use(express.logger('dev'));
});

// middleware

app.use(express.favicon(join(__dirname, '/../../public/app/images/favicon.ico')));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(join(__dirname, '/../../public')));
app.use(express.static(join(__dirname, '/../../tmp')));
app.use(require('./session'));
app.use(require('./routes'));

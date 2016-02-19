/**
 * Module dependencies
 */
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var join = require('path').join;

// mongo

config.mongo = mongoose.createConnection(process.env.QUIZMAKER_MONGO);

// mongo sesison store

config.sessionStore = new MongoStore({
  mongooseConnection: config.mongo,
});

config.session = session({
  secret: config.secret,
  key: 'express.sid',
  store: config.sessionStore,
  resave: false,
  saveUninitialized: true
});

// models, fields, hooks, apis

config.apis = require('ember-mongoose')()
  .models(config.mongo, join(__dirname, '../models'))
  .fields(join(__dirname, '../api_fields'))
  .hooks(join(__dirname, '../api_hooks'));

config.models = config.apis._models;

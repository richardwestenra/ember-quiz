/**
  * Module dependencies.
  */
var express = require('express')
var config = require('../../config');
var MongoStore = require('connect-mongo')(express);
var mongo = require('./models').mongo;

// cookie session

module.exports = express.cookieSession({
  secret: config.secret,
  key: 'express.sid',
  store: new MongoStore({
    db: mongo
  })
});

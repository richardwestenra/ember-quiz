/**
  * Module dependencies.
  */
var express = require('express')
var config = require('../../config');
var MongoStore = require('connect-mongo')(express);

// cookie session

module.exports = express.cookieSession({
  secret: config.secret,
  key: 'express.sid',
  store: new MongoStore({
    db: mongo
  })
});

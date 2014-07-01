/**
  * Module dependencies.
  */
var mongoose = require('ember-mongoose/node_modules/mongoose');
var config = require('../../config');

// connect

module.exports = mongoose.connect(config.mongo);
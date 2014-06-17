/**
  * Module dependencies.
  */
var mongoose = require('mongoose');
var timestamps = require('mongoose-time');
var debugs = require('./debugs');
var config = require('../../config');

// connect

exports.mongo = mongo = mongoose.connect(config.mongo);

// quiz schema

var schema = new mongoose.Schema({
}, {
  versionKey: false
});

// quiz model

var Quiz = exports.Quiz = mongo.model('Quiz', schema);

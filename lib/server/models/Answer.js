/**
  * Module dependencies.
  */
var mongoose = require('mongoose');
var timestamps = require('mongoose-time');


var schema = module.exports = new mongoose.Schema({
  title: String,
  image: String,
  result: String, // multiple
  value: Boolean, // boolean
  question: String,
}, {
  versionKey: false
});

schema.plugin(timestamps());

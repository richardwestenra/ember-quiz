/**
  * Module dependencies.
  */
var mongoose = require('mongoose');
var timestamps = require('mongoose-time');


var schema = module.exports = new mongoose.Schema({
  title: String,
  image: String,
  excerpt: String,
  quiz: String,
}, {
  versionKey: false
});

schema.plugin(timestamps());

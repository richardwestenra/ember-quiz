/**
  * Module dependencies.
  */
var mongoose = require('mongoose');
var timestamps = require('mongoose-time');

var schema = module.exports = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  max: Number,
  min: Number,
  quiz: {
    type: String,
    rel: 'Quiz'
  }
}, {
  versionKey: false
});

schema.plugin(timestamps());

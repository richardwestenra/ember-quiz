/**
  * Module dependencies.
  */
var mongoose = require('mongoose');
var timestamps = require('mongoose-time');


var schema = module.exports = new mongoose.Schema({
  title: String,
  image: String,
  excerpt: String,
  fullName: String,
  quizType: Number,
  submittedOn: Date,
  metaTitle: String,
  metaDesc: String,
  metaImage: String,
  metaTweet: String,
  url: String
}, {
  versionKey: false
});
schema.plugin(timestamps());
schema.pre('save', function(next){
  var timestamp = new Date();
  this.submittedOn = this.submittedOn || timestamp;
  next();
});
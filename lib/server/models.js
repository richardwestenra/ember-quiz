/**
  * Module dependencies.
  */
var mongoose = require('ember-mongoose/node_modules/mongoose');
var timestamps = require('mongoose-time');
var debugs = require('./debugs');
var config = require('../../config');
var ensure = require('./ensure');
var schema;

// quiz

schema = new mongoose.Schema({
  title : String,
  excerpt : String,
  fullname : String,
  quiztype : String,
  submittedOn : Date
}, {
  versionKey: false
});
schema.plugin(timestamps());
schema.methods.__isCreatable__ = ensure.any;
schema.methods.__isReadable__ = ensure.any;
schema.methods.__isUpdatable__ = ensure.any;
schema.methods.__isRemovable__ = ensure.any;
exports.Quiz = mongo.model('Quiz', schema);

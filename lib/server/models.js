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
  title: String,
  image: String,
  excerpt: String,
  fullName: String,
  quizType: String,
  submittedOn: Date
}, {
  versionKey: false
});
schema.plugin(timestamps());
schema.pre('save', function(next){
  var timestamp = new Date();
  this.submittedOn = this.submittedOn || timestamp;
  next();
});
schema.methods.__isCreatable__ = ensure.any;
schema.methods.__isReadable__ = ensure.any;
schema.methods.__isUpdatable__ = ensure.any;
schema.methods.__isRemovable__ = ensure.any;
exports.Quiz = mongo.model('Quiz', schema);

// question

schema = new mongoose.Schema({
  title: String,
  image: String,
  quiz: {
    type: String,
    rel: 'Quiz'
  }
}, {
  versionKey: false
});
schema.plugin(timestamps());
schema.methods.__isCreatable__ = ensure.any;
schema.methods.__isReadable__ = ensure.any;
schema.methods.__isUpdatable__ = ensure.any;
schema.methods.__isRemovable__ = ensure.any;
exports.Question = mongo.model('Question', schema);

// answer

schema = new mongoose.Schema({
  title: String,
  image: String,
  question: {
    type: String,
    rel: 'Question'
  }
}, {
  versionKey: false
});
schema.plugin(timestamps());
schema.methods.__isCreatable__ = ensure.any;
schema.methods.__isReadable__ = ensure.any;
schema.methods.__isUpdatable__ = ensure.any;
schema.methods.__isRemovable__ = ensure.any;
exports.Answer = mongo.model('Answer', schema);

// result

// schema = new mongoose.Schema({
//   title: String,
//   image: String,
//   answer: {
//     type: String,
//     rel: 'Answer'
//   }
// }, {
//   versionKey: false
// });
// schema.plugin(timestamps());
// schema.methods.__isCreatable__ = ensure.any;
// schema.methods.__isReadable__ = ensure.any;
// schema.methods.__isUpdatable__ = ensure.any;
// schema.methods.__isRemovable__ = ensure.any;
// exports.Result = mongo.model('Result', schema);

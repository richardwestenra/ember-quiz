// apis

var apis = require('ember-mongoose')(require('./models'));

// quiz

apis.Quiz.setPaths([
  'title',
  'image',
  'excerpt',
  'fullName',
  'quizType',
  'submittedOn'
]);

// question

apis.Question.setPaths([
  'title',
  'image',
  'quiz'
]);

// expose

module.exports = apis.getURIS();

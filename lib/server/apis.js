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

// answer

apis.Answer.setPaths([
  'title',
  'image',
  'question'
]);

// result

apis.Result.setPaths([
  'title',
  'content',
  'image',
  'range',
  'question'
]);

// expose

module.exports = apis.getURIS();

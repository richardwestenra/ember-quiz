// apis

var apis = require('ember-mongoose')(require('./models'));

// // quiz

apis.Quiz.setPaths([
  'title'
]);

// expose

module.exports = apis.getURIS();

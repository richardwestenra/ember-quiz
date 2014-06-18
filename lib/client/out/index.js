/**
  * Module dependencies.
  */
var request = require('superagent');
var id = window.location.pathname;

// call

request
  .get('/quizs/'+QUIZ)
  .end(onget);

// on get

function onget(res){
  var el = document.getElementById('container');
  el.innerText = JSON.stringify(res.body.quiz, null, 2);
};

/**
  * Module dependencies.
  */
var quiz = JSON.parse(QUIZ);

var inputs = document.querySelectorAll('input');
for (var i=0; i<inputs.length; i++){
  inputs[i].onchange = onchange;
}

// onchange

function onchange(e) {
  var answerId = e.target.dataset.answer;
  var questionId = e.target.dataset.question;

  var question = quiz
    .questions
    .find(function(question){
      return question._id == questionId;
    });

  if qu
    .answers
    .
  console.log(answer);
  console.log(question);
  console.log();
}

// validate

function validate(){

}
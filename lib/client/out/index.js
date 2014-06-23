/**
  * Module dependencies.
  */
var quiz = JSON.parse(QUIZ);

var inputs = document.querySelectorAll('input');
for (var i=0; i<inputs.length; i++){
  switch(quiz.quizType){
    case 1:
      inputs[i].onchange = onchange1;
      break;
    case 2:
      inputs[i].onchange = onchange2;
      break;
    case 3:
      inputs[i].onchange = onchange3;
      break;
  }
}

// 1

function onchange1(e){

  var question = onchange(e);

}

// 2

function onchange2(e){

  var question = onchange(e);

}

// 3

function onchange3(e){

  var question = onchange(e);

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

  question.userAnswers = question.userAnswers || [];
  question.userAnswers.push(answerId);

  return quiz
    .questions
    .find(function(question){
      return !question.userAnswers || question.userAnswers.length == 0;
    });

}

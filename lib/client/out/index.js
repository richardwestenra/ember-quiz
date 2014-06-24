/**
  * Module dependencies.
  */
var quiz = JSON.parse(QUIZ);

var inputs = document.querySelectorAll('input');
for (var i=0; i<inputs.length; i++){
  switch(quiz.type){
    case 0:
      inputs[i].onchange = onchange1;
      break;
    case 1:
      inputs[i].onchange = onchange2;
      break;
    case 2:
      inputs[i].onchange = onchange3;
      break;
  }
}

// 1

function onchange1(e){

  var question = onchange(e);
  console.log(question);

}

// 2

function onchange2(e){

  var question = onchange(e);
  console.log(question);

}

// 3

function onchange3(e){

  var question = onchange(e);
  console.log(question);

}

// onchange

function onchange(e) {

  var answerId = e.target.dataset.answer;
  var questionId = e.target.dataset.question;

  var question = quiz
    .questions
    .filter(function(question){
      return question._id == questionId;
    })[0];

  question.userAnswers = question.userAnswers || [];
  question.userAnswers.push(answerId);

  question = quiz
    .questions
    .filter(function(question){
      return !question.userAnswers || question.userAnswers.length == 0;
    })[0];

  if (!question){
    var result = rand(document.querySelectorAll('.result'));
    result.style.display = 'block';
    var el = document.querySelector('.quiz');
    el.style.opacity = .3;
    el.style['pointer-events'] = 'none';
  }

  return question;

}


function rand(myArray){
  return myArray[Math.floor(Math.random() * myArray.length)];
}
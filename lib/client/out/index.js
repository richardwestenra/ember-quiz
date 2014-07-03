/**
  * Module dependencies.
  */

function Program(){

  var self = this;

  self.quiz = JSON.parse(QUIZ);

  var inputs = document.querySelectorAll('input');
  for (var i=1; i<=inputs.length; i++){
    inputs[i-1].onchange = function(e){
      self.onchange.call(self, e);
      self['onchange'+i].call(self, e);
    }
  }

  var btn = self.btn = document.querySelector('button');
  if (btn){
    btn.onclick = self.onchange1.bind(self);
  }

};

// 1

Program.prototype.onchange1 = function(e){

  var question = this.quiz.questions[0];
  question.userAnswers = question.userAnswers || [];
  var range = question.userAnswers.length;
  var result = this.quiz.results.filter(function(result){
    return result.min >= range && range <= result.max;
  })[0];

  if (!!result){
    var result = document.getElementById(result._id)
    result.style.display = 'block';
    var el = document.querySelector('.quiz');
    el.style.opacity = .3;
    el.style['pointer-events'] = 'none';
    this.btn.style.display = 'none';
  }

}

// 2

Program.prototype.onchange2 = function(e){

  var question = this.quiz
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

}

// 3

Program.prototype.onchange3 = function(e){

}

// onchange

Program.prototype.onchange = function(e){

  var answerId = e.target.dataset.answer;
  var questionId = e.target.dataset.question;

  var question = this.quiz
    .questions
    .filter(function(question){
      return question._id == questionId;
    })[0];

  question.userAnswers = question.userAnswers || [];
  question.userAnswers.push(answerId);

}


function rand(myArray){
  return myArray[Math.floor(Math.random() * myArray.length)];
}


new Program;

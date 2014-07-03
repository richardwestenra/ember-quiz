/**
  * Module dependencies.
  */

function Program(){

  var self = this;
  self.quiz = JSON.parse(QUIZ);
  var inputs = document.querySelectorAll('input');
  for (var i=0; i<inputs.length; i++){
    var input = inputs[i];
    input.onchange = function(e){
      self['onchange'+self.quiz.type].call(self, e);
    }
  }

  var btn = self.btn = document.querySelector('button');
  if (btn){
    btn.onclick = function(){

      var range = self.userAnswers.length;
      var result = self.quiz.results.filter(function(result){
        return result.min >= range && range <= result.max;
      })[0];
      if (!!result){
        var question = self.quiz.questions[0];
        self.show(question, result);
      }

    }
  }

};

// 0

Program.prototype.onchange0 = function(e){

  var questionId = e.target.dataset.question;
  var answerId = e.target.dataset.answer;
  var question = this.findQuestion(questionId);
  var answer = this.findAnswer(question, answerId);
  var result = this.findResult(answer.result);
  if (!!result){
    this.show(question, result);
  }

};

// 1

Program.prototype.onchange1 = function(e){

  var answerId = e.target.dataset.answer;
  this.userAnswers = this.userAnswers || [];
  this.userAnswers.push(answerId);

};

// 2

Program.prototype.onchange2 = function(e){

  var questionId = e.target.dataset.question;
  var answerId = e.target.dataset.answer;

  // this.show(question, result);

};


// find

Program.prototype.findQuestion = function(questionId){

  return this
    .quiz
    .questions
    .filter(function(question){
      return question._id == questionId;
    })[0];

};


Program.prototype.findResult = function(resultId){

  return this
    .quiz
    .results
    .filter(function(result){
      return result._id == resultId;
    })[0];

};


Program.prototype.findAnswer = function(question, answerId){

  return question
    .answers
    .filter(function(answer){
      return answer._id == answerId;
    })[0];

};


/**
  * Show `result` under `question`
  */
Program.prototype.show = function(question, result){

  var resultEl = document.getElementById(result._id).cloneNode(true);
  resultEl.style.display = 'block';
  
  var questionEl = document.getElementById(question._id);
  questionEl.appendChild(resultEl);

  var questionEl = document.getElementById(question._id+'-inner');
  questionEl.style.opacity = .3;
  questionEl.style['pointer-events'] = 'none';

};

new Program;

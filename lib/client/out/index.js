/**
  * Module dependencies.
  */

function Program(){

  var self = this;
  self.quiz = window.QUIZ;
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

      self.userAnswers = self.userAnswers || [];
      var range = self.userAnswers.length;
      var result = self.quiz.results.filter(function(result){
        return result.min <= range && range <= result.max;
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
  var question = this.findQuestion(questionId);
  var answer = this.findAnswer(question, answerId);

  // show res
  var bool = (!!answer.value)
    ? 'Right'
    : 'Wrong';
  var resultEl = document.createElement('div');
  resultEl.className = 'inlineResult';
  var qe = question.excerpt || '';
  resultEl.innerHTML = [
    '<h5>'+bool+'</h5>',
    '<p>'+qe+'</p>'
  ].join('');

  var questionEl = document.getElementById(question._id);
  questionEl.appendChild(resultEl);

  var questionEl = document.getElementById(question._id+'-inner');
  questionEl.style.opacity = .3;
  questionEl.style['pointer-events'] = 'none';
  questionEl.className += ' selectedQ';

  // add answer

  this.userAnswers = this.userAnswers || [];
  this.userAnswers.push(answer.value);

  // show overal res

  if (this.userAnswers.length !== this.quiz.questions.length) return;

  var range = this.userAnswers.filter(function(a){
    return !!a;
  }).length;
  var result = this.quiz.results.filter(function(r){
    return r.min >= range && range <= r.max;
  })[0];
  if (!!result){
    var question = this.quiz.questions[this.quiz.questions.length-1];
    this.show(question, result);
  }

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

window.PROGRAM = new Program;

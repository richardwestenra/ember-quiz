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
        self.show(question, result, true);
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

  this.userAnswers = this.userAnswers || [];
  this.push(e, result);

  var end = this.userAnswers.length == this.quiz.questions.length;
  if (!end) return;

  var buff = {};
  this.userAnswers.forEach(function(res){
    buff[res._id] = buff[res._id] || 0;
    ++buff[res._id];
  });

  var id;
  var max = 0;
  for (var key in buff){
    var value = buff[key];
    if (value > max){
      id = key;
      max = value;
    }
  }

  var result = this.findResult(id);
  if (!result) return;

  var question = this.quiz.questions[this.quiz.questions.length-1];
  this.show(question, result, true);

};

// 1

Program.prototype.onchange1 = function(e){

  var questionId = e.target.dataset.question;
  var answerId = e.target.dataset.answer;
  var question = this.findQuestion(questionId);
  var answer = this.findAnswer(question, answerId);
  var answerId = e.target.dataset.answer;
  this.push(e, answer, '_id');

};

// 2

Program.prototype.onchange2 = function(e){

  var questionId = e.target.dataset.question;
  var answerId = e.target.dataset.answer;
  var question = this.findQuestion(questionId);
  var answer = this.findAnswer(question, answerId);

  // show res
  var bool = (!!answer.value)
    ? '<span class="glyphicon glyphicon-ok"></span> Correct!'
    : '<span class="glyphicon glyphicon-remove"></span> Wrong!';
  var boolClass = (!!answer.value)
    ? 'correct'
    : 'wrong';
  var resultEl = document.createElement('div');
  resultEl.className = 'inlineResult ' + boolClass;
  var qe = question.excerpt || '';
  resultEl.innerHTML = [
    '<h4 class="result-title">'+bool+'</h4>',
    '<p>'+qe+'</p>'
  ].join('');

  var questionEl = document.getElementById(question._id);
  questionEl.appendChild(resultEl);

  var questionEl = document.getElementById(question._id+'-inner');
  questionEl.style.opacity = .3;
  questionEl.style['pointer-events'] = 'none';
  questionEl.className += ' selectedQ';

  // add answer

  this.push(e, answer, 'value');

  // show overal res

  if (this.userAnswers.length !== this.quiz.questions.length) return;

  var range = this.userAnswers.filter(function(a){
    return !!a;
  }).length;
  var result = this.quiz.results.filter(function(r){
    return r.min >= range && range < r.max;
  })[0];

  if (!result) return;

  var question = this.quiz.questions[this.quiz.questions.length-1];
  this.show(question, result, true);

};


Program.prototype.push = function(e, item, key){
  this.userAnswers = this.userAnswers || [];
  if (e.target.checked){
    if (key){
      this.userAnswers.push(item[key]);
    } else {
      this.userAnswers.push(item);
    }
  } else {
    this.userAnswers = this.userAnswers.filter(function(a){
      if (key){
        return a[key] != item[key];
      } else {
        return a != item;
      }
    });
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
Program.prototype.show = function(question, result, end){

  var score;
  if (this.quiz.type === 1){
    score = 'You selected '+this.userAnswers.length+' out of '+this.quiz.questions[0].answers.length+'.';
  }
  if (this.quiz.type === 2){
    var right = this.userAnswers.filter(function(a){
      return !!a;
    });
    score = 'You got '+right.length+' out of '+this.quiz.questions[0].answers.length+' right!';
  }

  function ifSet(val,content){
    return (typeof val === 'string') ? content : '';
  }
  var resultEl = document.createElement('div');
  resultEl.className = 'result';
  resultEl.setAttribute('id',result._id);
  resultEl.innerHTML = [
    ifSet(result.title,'<h3 class="result-title">'+result.title+'</h3>'),
    ifSet(result.image,'<img class="result-image" src="'+result.image+'" width="" height="" alt="" />'),
    ifSet(result.content,'<p class="result-para">'+result.content+'</p>')
  ].join('');
  
  var finalResultEl = document.getElementById('finalResult');
  if (score && end){

    var btn = document.getElementById('submitBtn');
    if (btn) btn.style.display = 'none';

    var scoreEl = document.createElement('h3');
    scoreEl.className = 'finalScore';
    scoreEl.innerHTML = score;
    finalResultEl.appendChild(scoreEl);

  }

  finalResultEl.appendChild(resultEl);

  if (!end){

    var questionEl = document.getElementById(question._id+'-inner');
    this.fade(questionEl);

  } else {

    var quizEl = document.querySelector('.quiz');
    this.fade(quizEl);

    var els = document.querySelectorAll('.question .inner');
    for (var i=0; i<els.length; i++){
      this.fade(els[i]);
    }

    this.smoothScrollTo(finalResultEl.offsetTop,400);

  }

};


/**
  * Reduce `el` visibility.
  *
  * @param {Element} el
  */
Program.prototype.fade = function(el){
  el.style.opacity = .3;
  el.style['pointer-events'] = 'none';
};

/**
  * Smoothly scroll to a page element
  */
Program.prototype.smoothScrollTo = function (target, duration) {
  var timer, start, factor;
  var offset = window.pageYOffset,
      delta  = target - window.pageYOffset; // Y-offset difference
  duration = duration || 1000;              // default 1 sec animation
  start = Date.now();                       // get start time
  factor = 0;
  
  if( timer ) {
    clearInterval(timer); // stop any running animations
  }

  function step() {
    var y;
    factor = (Date.now() - start) / duration; // get interpolation factor
    if( factor >= 1 ) {
      clearInterval(timer); // stop animation
      factor = 1;           // clip to max 1.0
    } 
    y = factor * delta + offset;
    window.scrollBy(0, y - window.pageYOffset);
  }
  
  timer = setInterval(step, 10);
  return timer;
};

window.PROGRAM = new Program;

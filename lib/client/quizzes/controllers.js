/**
  * Module dependencies.
  */
var Batch = require('batch');

/**
  * Quizzes controller.
  */
App.QuizzesController = Em.ArrayController.extend({

  needs: ['quizzesIndex'],

  booleans: [
    {
      label: 'True',
      value: true,
    }, {
      label: 'False',
      value: false
    }
  ],

  quizTypes: [
    'Multiple choice',
    'Checklist',
    'True/false'
  ].map(function(label, value){
    return Em.Object.create({
      label: label,
      value: value
    });
  }),

  actions: {

    /**
      * Save `quiz`.
      *
      * @param {App.Quiz} quiz
      */
    saveQuiz: function(quiz){

      var self = this;
      var push = !!!quiz.get('id');

      return saveQuiz();

      function saveQuiz(){

        NProgress.start();
        NProgress.set(0.4);

        quiz
          .save()
          .then(function(_quiz){

            var batch = new Batch;
            batch.concurrency(1); // save results first so that they can acquire id
            batch.push(saveResults.bind(null, quiz, _quiz));
            batch.push(saveQuestions.bind(null, quiz, _quiz));
            batch.end(next);

            function next(err){
              if (push){
                self.pushObject(quiz);
              }
              Em.run.next(function(){
                NProgress.done();
                self.transitionToRoute('quizzes.index');
              });
            };

          });

      };

      function saveResults(quiz, _quiz, next){

        var batch = new Batch;

        quiz.get('results').forEach(function(result){
          batch.push(function(done){
            result.set('quiz', _quiz);
            result.save().then(done.bind(null, null));
          });
        });

        batch.end(next);

      };

      function saveQuestions(quiz, _quiz, next){

        var batch = new Batch;

        quiz.get('questions').forEach(function(question){
          batch.push(function(done){
            question.set('quiz', _quiz);
            question
              .save()
              .then(function(_question) {
                saveAnswers(question, _question, done);
              });
          });
        });

        batch.end(next);

      };


      function saveAnswers(question, _question, next){

        var batch = new Batch;

        question.get('answers').forEach(function(answer){
          batch.push(function(done){
            answer.set('question', _question);
            answer.save().then(done.bind(null, null));
          });
        });

        batch.end(next);

      };

    },


    /**
      * Remove `quiz`.
      *
      * @param {App.Quiz} quiz
      */
    removeQuiz: function(quiz){
      
      quiz.deleteRecord();
      quiz.save();
      this.removeObject(quiz);

    },

    /**
      * Show iframe embed code popup.
      *
      * @param {App.Quiz} quiz
      */
    showEmbed: function(quiz){
      var url = window.location.protocol + '//' + window.location.host + '/out?quiz=' + quiz.get('id');
      var iframe = '<iframe style="box-shadow:0 0 2px rgba(0,0,0,0.3);" src="'+url+'" width="640" height="900" frameborder="0" marginheight="0" marginwidth="0"></iframe>';
      var msg = 'Copy the following code to embed an iframe: \n\n'+ iframe;
      alert(msg);
    },

    /**
      * Add new question to `quiz`.
      *
      * @param {App.Quiz} quiz
      */
    addQuestion: function(quiz){
      var question = this.store.createRecord('question', {});
      question.loadChildren();
      quiz.get('questions').pushObject(question);
      quiz.recomputeQuestionsIndex();
    },

    /**
      * Remove `question` from `quiz`.
      *
      * @param {App.Quiz} quiz
      * @param {App.Question} question
      */
    removeQuestion: function(quiz, question){
      
      question.deleteRecord();

      if (question.get('id')){
        question.save().then(next);
      } else {
        next();
      }

      function next(){
        quiz.get('questions').removeObject(question);
        quiz.recomputeQuestionsIndex();
      }

    },

    /**
      * Add new answer to `question`.
      *
      * @param {App.Question} question
      */
    addAnswer: function(question){
      var answer = this.store.createRecord('answer', {});
      question.get('answers').pushObject(answer);
      question.recomputeAnswersIndex();
    },


    /**
      * Remove `answer` from `question`.
      *
      * @param {App.Question} question
      * @param {App.Answer} answer
      */
    removeAnswer: function(question, answer){
      
      answer.deleteRecord();

      if (answer.get('id')){
        answer.save().then(next);
      } else {
        next();
      }

      function next(){
        question.get('answers').removeObject(answer);
        question.recomputeAnswersIndex();
      }

    },


    /**
      * Add new result to `quiz`.
      *
      * @param {App.Quiz} quiz
      */
    addResult: function(quiz){
      var result = this.store.createRecord('result', {});
      quiz.get('results').pushObject(result);
      quiz.recomputeResultsIndex();
    },


    /**
      * Remove `result` from `quiz`.
      *
      * @param {App.Quiz} quiz
      * @param {App.Result} result
      */
    removeResult: function(quiz, result){
      
      result.deleteRecord();

      if (result.get('id')){
        result.save().then(next);
      } else {
        next();
      }

      function next(){
        quiz.get('results').removeObject(result);
        quiz.recomputeResultsIndex();
      }

    },

    /**
      * Unset `model` image.
      *
      * @param {App.Quiz|Question|Result|Image} model
      */
    removeImage: function(model){
      model.set('image', null);
    }

  }


});


/**
  * Quizzes index controller.
  */
App.QuizzesIndexController = Em.Controller.extend({
  needs: ['quizzes']
});


/**
  * Quizzes new controller.
  */
App.QuizzesNewController = Em.ObjectController.extend({
  
  needs: ['quizzes']

});
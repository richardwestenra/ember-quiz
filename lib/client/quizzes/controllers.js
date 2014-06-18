/**
  * Module dependencies.
  */
var Batch = require('batch');

/**
  * Quizzes controller.
  */
App.QuizzesController = Em.Controller.extend({

  needs: ['quizzesIndex'],

  quizTypes: [
    'Multiple choice',
    'Checklist',
    'Either/or'
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

      return saveQuiz();

      function saveQuiz(){

        NProgress.start();
        NProgress.set(0.4);

        quiz
          .save()
          .then(saveQuestions.bind(null, next, quiz));

        function next(err, _quiz){
          self.get('controllers.quizzesIndex').pushObject(_quiz);
          Em.run.next(function(){
            NProgress.done();
            self.transitionToRoute('quizzes.index');
          });
        };

      };

      function saveQuestions(next, quiz, _quiz){

        var batch = new Batch;

        quiz.get('questions').forEach(function(question){
          batch.push(function(done){
            question.set('quiz', _quiz);
            question.save().then(saveAnswers.bind(null, done, question));
          });
        });

        batch.end(function(err){
          next(err, _quiz);
        });

      };


      function saveAnswers(next, question, _question){

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
      * Remove quiz`.
      *
      * @param {App.Quiz} quiz
      */
    removeQuiz: function(quiz){
      
      quiz.deleteRecord();
      quiz.save();
      this.get('controllers.quizzesIndex').removeObject(quiz);

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
    },

    /**
      * Remove question from `quiz`.
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
    },


    /**
      * Remove answer from `question`.
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
      }

    },

  }


});


/**
  * Quizzes index controller.
  */
App.QuizzesIndexController = Em.ArrayController.extend({
  needs: ['quizzes']
});


/**
  * Quizzes new controller.
  */
App.QuizzesNewController = Em.ObjectController.extend({
  
  needs: ['quizzes']

});
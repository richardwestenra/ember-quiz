/**
  * Module dependencies.
  */
var Batch = require('batch');

/**
  * Quizzes controller.
  */
App.QuizzesController = Em.ArrayController.extend({

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
      * @param {Em.Object} quiz
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

        function next(){
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

        batch.end(next);

      };


      function saveAnswers(next, question, _question){

        var batch = new Batch;

        batch.end(next);

      };

    },

    /**
      * Add new question to `quiz`.
      *
      * @param {Em.Object} quiz
      */
    addQuestion: function(quiz){
      var question = this.store.createRecord('question', {});
      quiz.get('questions').pushObject(question);
    },

    /**
      * Remove question from `quiz`.
      *
      * @param {Em.Object} quiz
      * @param {Em.Object} question
      */
    removeQuestion: function(quiz, question){
      
      question.deleteRecord();

      if (question.get('id')){
        question
          .save()
          .then(next);
      } else {
        next();
      }

      function next(){
        quiz.get('questions').removeObject(question);
      }

    },

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
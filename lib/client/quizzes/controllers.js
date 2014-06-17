/**
  * Quizzes controller.
  */
App.QuizzesController = Em.ObjectController.extend({
});


/**
  * Quizzes index controller.
  */
App.QuizzesIndexController = Em.ArrayController.extend({
  needs: ['quizzes']
});

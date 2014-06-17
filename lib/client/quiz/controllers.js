/**
  * Quiz controller.
  */
App.QuizController = Em.ObjectController.extend({
});


/**
  * Quiz index controller.
  */
App.QuizIndexController = Em.ArrayController.extend({
  needs: ['quiz']
});

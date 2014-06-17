/**
  * Quizes controller.
  */
App.QuizesController = Em.ObjectController.extend({
});


/**
  * Quizes index controller.
  */
App.QuizesIndexController = Em.ArrayController.extend({
  needs: ['quizes']
});

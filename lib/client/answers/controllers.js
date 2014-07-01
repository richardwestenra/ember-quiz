/**
  * Answers controller.
  */
App.AnswersController = Em.ObjectController.extend({
});


/**
  * Answers index controller.
  */
App.AnswersIndexController = Em.ArrayController.extend({
  needs: ['answers']
});

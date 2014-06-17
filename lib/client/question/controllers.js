/**
  * Question controller.
  */
App.QuestionController = Em.ObjectController.extend({
});


/**
  * Question index controller.
  */
App.QuestionIndexController = Em.ArrayController.extend({
  needs: ['question']
});

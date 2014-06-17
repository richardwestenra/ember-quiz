/**
  * Answer controller.
  */
App.AnswerController = Em.ObjectController.extend({
});


/**
  * Answer index controller.
  */
App.AnswerIndexController = Em.ArrayController.extend({
  needs: ['answer']
});

/**
  * Questions controller.
  */
App.QuestionsController = Em.ObjectController.extend({
});


/**
  * Questions index controller.
  */
App.QuestionsIndexController = Em.ArrayController.extend({
  needs: ['questions']
});

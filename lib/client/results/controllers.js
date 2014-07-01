/**
  * Results controller.
  */
App.ResultsController = Em.ObjectController.extend({
});


/**
  * Results index controller.
  */
App.ResultsIndexController = Em.ArrayController.extend({
  needs: ['results']
});

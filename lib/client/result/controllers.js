/**
  * Result controller.
  */
App.ResultController = Em.ObjectController.extend({
});


/**
  * Result index controller.
  */
App.ResultIndexController = Em.ArrayController.extend({
  needs: ['result']
});

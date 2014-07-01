/**
  * Module dependencies.
  */

/**
  * Application controller
  */
App.ApplicationController = Em.ArrayController.extend({
  config: window.CONFIG
});

/**
  * Index controller
  */
App.IndexController = Em.Controller.extend({
  needs: ['application']
});

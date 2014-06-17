/**
  * Module dependencies.
  */
require('ember');

// app

window.App = Em.Application.create();

// app scripts

require('./templates');
require('./models');
require('./views');
require('./controllers');
require('./routes');

// local components

// require('quizes');
// require('quiz');
// require('questions');
// require('question');
// require('answers');
// require('answer');

// bootstrap

require('./bootstrap/js/tab.js');
require('./bootstrap/js/button.js');
require('./bootstrap/js/affix.js');
require('./bootstrap/js/dropdown.js');
require('./bootstrap/js/collapse.js');
require('./bootstrap/js/scrollspy.js');
require('./bootstrap/js/carousel.js');
require('./bootstrap/js/alert.js');
require('./bootstrap/js/transition.js');
require('./bootstrap/js/tooltip.js');
require('./bootstrap/js/popover.js');
require('./bootstrap/js/modal.js');

// router

App.Router.map(function(){

  this.resource('quizes', { path: '/'}, function(){
    this.resource('quiz', { path: '/:quiz_id'}, function(){
    });
  });

});

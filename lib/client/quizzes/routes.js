/**
  * Quizzes route.
  */
App.QuizzesRoute = Em.Route.extend({
});


/**
  * Quizzes index route.
  */
App.QuizzesIndexRoute = Em.Route.extend({
  model: function(){
    return this.store.find('quiz');
  }
});

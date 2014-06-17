/**
  * Quizzes route.
  */
App.QuizzesRoute = Em.Route.extend({
  model: function(){
    return this.store.find('quiz');
  }
});


/**
  * Quizzes index route.
  */
App.QuizzesIndexRoute = Em.Route.extend({
});


/**
  * Quizzes new route.
  */
App.QuizzesNewRoute = Em.Route.extend({
  model: function(){
    return this.store.createRecord('quiz', {});
  }
});
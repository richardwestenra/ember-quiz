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


/**
  * Quizzes new route.
  */
App.QuizzesNewRoute = Em.Route.extend({
  model: function(){
    return this.store.createRecord('quiz', {});
  }
});
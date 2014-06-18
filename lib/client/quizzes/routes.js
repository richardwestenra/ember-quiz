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
  },

  setupController: function(controller, model){

    this._super(controller, model);

    model.loadChildren();

  },

  deactivate: function(){
    this
      .get('controller.content')
      .deleteRecord();
  }

});
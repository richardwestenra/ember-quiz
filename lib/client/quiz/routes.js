/**
  * Quiz route.
  */
App.QuizRoute = Em.Route.extend({

  setupController: function(controller, model){

    this._super(controller, model);

    model.loadChildren();

  },

  deactivate: function() {
    this
      .get('controller.content')
      .rollback();
  }

});


/**
  * Quiz index route.
  */
App.QuizIndexRoute = Em.Route.extend({
});


/**
  * Quiz edit route.
  */
App.QuizEditRoute = Em.Route.extend({
});

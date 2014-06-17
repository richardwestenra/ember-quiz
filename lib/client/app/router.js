
// router

App.Router.map(function(){

  this.resource('quizes', { path: '/'}, function(){
    this.resource('quiz', { path: '/:quiz_id'}, function(){
    });
  });

});

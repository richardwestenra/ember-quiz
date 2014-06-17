
// router

App.Router.map(function(){

  this.resource('quizzes', { path: '/'}, function(){
    this.route('new');
    this.resource('quiz', { path: '/:quiz_id'}, function(){
    });
  });

});

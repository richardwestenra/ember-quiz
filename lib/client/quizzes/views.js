

App.IndentView = Em.View.extend({

  classNameBindings: [
    'indent'
  ],

  indent: function(){

    return (this.get('quiz.quizType') == 1)
      ? 'col-sm-12'
      : 'col-sm-offset-1 col-sm-11'

  }.property('quiz.quizType')

});

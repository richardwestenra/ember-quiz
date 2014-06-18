
// quiz

App.Quiz = DS.Model.extend({

  title: DS.attr('string'),
  image: DS.attr('string'),
  excerpt: DS.attr('string'),
  fullName: DS.attr('string'),
  quizType: DS.attr('string'),
  submittedOn: DS.attr('date'),

  loadChildren: function(){

    var self = this;
    this.set('questions', []);
    var id = self.get('id');
    if (id){
      this
        .store
        .find('question', {
          conditions: {
            quiz: id
          }
        })
        .then(function(questions){
          questions.forEach(function(question){
            self.get('questions').pushObject(question);
          });
        });
    }
  }

});

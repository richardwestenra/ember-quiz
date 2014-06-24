
// quiz

App.Quiz = DS.Model.extend({

  title: DS.attr('string'),
  image: DS.attr('string'),
  excerpt: DS.attr('string'),
  fullName: DS.attr('string'),
  quizType: DS.attr('number'),
  submittedOn: DS.attr('date'),

  loadChildren: function(){

    var self = this;

    self.set('questions', []);
    self.set('results', []);
    
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
            question.loadChildren();
            self.get('questions').pushObject(question);
          });
        });
      this
        .store
        .find('result', {
          conditions: {
            quiz: id
          }
        })
        .then(function(results){
          results.forEach(function(result){
            self.get('results').pushObject(result);
          });
        });
    }
  }

});

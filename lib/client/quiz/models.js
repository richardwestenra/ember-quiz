
// quiz

App.Quiz = DS.Model.extend({

  title: DS.attr('string'),
  image: DS.attr('string'),
  excerpt: DS.attr('string'),
  fullName: DS.attr('string'),
  quizType: DS.attr('number'),
  submittedOn: DS.attr('date'),

  isTypeOne: function(){
    return this.get('quizType') == 0;
  }.property('quizType'),
  
  isTypeTwo: function(){
    return this.get('quizType') == 1;
  }.property('quizType'),
  
  isTypeThree: function(){
    return this.get('quizType') == 2;
  }.property('quizType'),
    
  addDefaultQuestion: function(){
    if (this.get('questions.length') == 0 && this.get('isTypeTwo')){
      var question = this.store.createRecord('question', {});
      question.loadChildren();
      this.get('questions').pushObject(question);
    }
  },

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
            if (question.get('id')){
              question.loadChildren();
            }
            self.get('questions').pushObject(question);
            self.addObserver('quizType', self.addDefaultQuestion.bind(self));
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
    } else {
      self.addObserver('quizType', self.addDefaultQuestion.bind(self));
    }
  }

});

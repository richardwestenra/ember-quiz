
// quiz

App.Quiz = DS.Model.extend({

  title: DS.attr('string'),
  image: DS.attr('string'),
  excerpt: DS.attr('string'),
  fullName: DS.attr('string'),
  quizType: DS.attr('number'),
  submittedOn: DS.attr('date'),
  metaTitle: DS.attr('string'),
  metaDesc: DS.attr('string'),
  metaImage: DS.attr('string'),
  url: DS.attr('string'),

  isTypeOne: function(){
    return this.get('quizType') == 0;
  }.property('quizType'),
  
  isTypeTwo: function(){
    return this.get('quizType') == 1;
  }.property('quizType'),
  
  isTypeThree: function(){
    return this.get('quizType') == 2;
  }.property('quizType'),

  recomputeQuestionsIndex: function(){
    this.get('questions').forEach(function(question, i){
      question.set('__index', i+1);
    });
  },

  recomputeResultsIndex: function(){
    this.get('results').forEach(function(result, i){
      result.set('__index', i+1);
    });
  },

  recomputeResultsMin: function(){
    var results = this.get('results');
    results.forEach(function(result, i){
      var min;
      if (i == 0){
        min = 0;
      } else {
        var prev = results.objectAt(i-1);
        min = Number(prev.get('max')) + 1;
      }
      result.set('min', min);
    });
  }.observes('results.@each.max'),

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
            self.recomputeQuestionsIndex();
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
          self.recomputeResultsIndex();
        });
    } else {
      self.addObserver('quizType', self.addDefaultQuestion.bind(self));
    }
  }

});

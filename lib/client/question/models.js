
// question

App.Question = DS.Model.extend({
  title: DS.attr('string'),
  excerpt: DS.attr('string'),
  image: DS.attr('string'),
  quiz: DS.belongsTo('quiz'),

  recomputeAnswersIndex: function(){
    this.get('answers').forEach(function(answer, i){
      answer.set('__index', i+1);
    });
  },

  loadChildren: function(){

    var self = this;

    self.set('answers', []);

    var id = self.get('id');
    
    if (id){
      this
        .store
        .find('answer', {
          conditions: {
            question: id
          }
        })
        .then(function(answers){
          answers.forEach(function(answer){
            self.get('answers').pushObject(answer);
          });
          self.recomputeAnswersIndex();
        });
    }
  }

});

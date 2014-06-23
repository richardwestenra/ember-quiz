
// question

App.Question = DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  quiz: DS.belongsTo('quiz'),

  anwsersRange: function(){
    return this
      .get('answers')
      .map(function(answer, i){
        return ++i;
      });
  }.property('answers.length'),

  loadChildren: function(){

    var self = this;

    self.set('answers', []);
    self.set('results', []);

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
        });
      this
        .store
        .find('result', {
          conditions: {
            question: id
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

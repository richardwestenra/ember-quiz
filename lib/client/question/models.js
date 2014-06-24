
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
    }
  }

});

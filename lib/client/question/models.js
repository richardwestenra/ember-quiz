
// question

App.Question = DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  quiz: DS.belongsTo('quiz'),
  answers: []
});

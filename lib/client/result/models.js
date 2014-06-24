
// result

App.Result = DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  content: DS.attr('string'),
  range: DS.attr('number'),
  quiz: DS.belongsTo('quiz')
});


// result

App.Result = DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  content: DS.attr('string'),
  max: DS.attr('number'),
  min: DS.attr('number'),
  quiz: DS.belongsTo('quiz'),
});

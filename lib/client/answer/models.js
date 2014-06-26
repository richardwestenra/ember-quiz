
// answer

App.Answer = DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  value: DS.attr('boolean'),
  question: DS.belongsTo('question'),
  result: DS.belongsTo('result')
});

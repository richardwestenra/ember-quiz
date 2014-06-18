
// result

App.Result = DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  question: DS.belongsTo('question')
});

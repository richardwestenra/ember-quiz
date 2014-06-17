App.Quiz = DS.Model.extend({
  title : DS.attr('string'),
  image : DS.attr('string'),
  excerpt : DS.attr('string'),
  fullname : DS.attr('string'),
  quiztype : DS.attr('string'),
  submittedOn : DS.attr('date')
});

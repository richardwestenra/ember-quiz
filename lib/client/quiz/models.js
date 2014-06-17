
// quiz

App.Quiz = DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  excerpt: DS.attr('string'),
  fullName: DS.attr('string'),
  quizType: DS.attr('string'),
  submittedOn: DS.attr('date'),
  questions: []
});

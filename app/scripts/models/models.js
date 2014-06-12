/* global Ember */
Quizmaker.Quiz = DS.Model.extend({
  title : DS.attr('string'),
  excerpt : DS.attr('string'),
  fullname : DS.attr('string'),
  quiztype : DS.attr('string'),
  questions: DS.hasMany('question', { async: true }), //  via http://stackoverflow.com/questions/22494140/in-ember-js-how-do-i-create-a-computed-property-that-references-first-item-in-pr
  questionsCount: function() {
		return this.get('questions.length');
	}.property('questions.@each'), // via http://stackoverflow.com/questions/16463958/how-to-use-multiple-models-with-a-single-route-in-emberjs-ember-data
  // firstQuestion: function() {
  //   return this.get('questions.firstObject');
  // }.property('questions.firstObject')
  submittedOn : DS.attr('date')
});

Quizmaker.Question = DS.Model.extend({
	quiz: DS.belongsTo('quiz', { async: true }),
	question: DS.attr('string'),
	// answers: DS.attr('string')
	answers: DS.hasMany('answer', { async: true })
});

Quizmaker.Answer = DS.Model.extend({
	question: DS.belongsTo('question', { async: true }),
	answer: DS.attr('string')
});

// delete below here if you do not want fixtures
Quizmaker.Quiz.FIXTURES = [
	{
		id: 0,
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		quiztype: 'Boolean',
		fullname: 'Full Name',
		submittedOn: null
	}
];
Quizmaker.Question.FIXTURES = [
	{
		id: 0,
		question: 'Test question Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		quiz: 0,
		answers: [
			{ answer: 'alpha', weight: 0 },
			{ answer: 'beta', weight: 5 }
		]
	}
];

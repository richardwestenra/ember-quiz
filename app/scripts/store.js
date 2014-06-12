Quizmaker.ApplicationStore = DS.Store.extend();
// Quizmaker.ApplicationAdapter = DS.FixtureAdapter;
Quizmaker.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'quizzes'
});

Quizmaker.ApplicationSerializer = DS.LSSerializer.extend({
});
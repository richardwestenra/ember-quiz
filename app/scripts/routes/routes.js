Quizmaker.ApplicationRoute = Ember.Route.extend({
	model: function () {
		return this.get('store').findAll('quiz');
	}
});

Quizmaker.QuizzesRoute = Ember.Route.extend({
	model: function() {
		return this.get('store').find('quiz');
	}
});

Quizmaker.QuizRoute = Ember.Route.extend({
	model: function(params) {
		return this.get('store').find('quiz', params.quiz_id);
	}
});
Quizmaker.NewRoute = Ember.Route.extend({
	model: function() {
		return this.get('store').createRecord('quiz');
	},

	actions: {
		save: function() {
			this.get('model').save().then(function() {
				this.transitionTo('...')
			}.bind(this));
		},

		cancel: function() {
			this.get('model').destroyRecord();
			this.transitionTo('...');
		}
	}
})
Quizmaker.QuizIndexRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('quiz');
	}
});
Quizmaker.QuizEditRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('quiz');
	}
});

Quizmaker.QuestionsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('question');
	},
	setupController: function(controller, model) {
		controller.set('model', model);
	},
	actions: {
		removeQuestion: function(model) {
			console.log('Delete from route');
			model.destroyRecord();
		}
	}
});

// nbed ??
Quizmaker.AnswersRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('answer');
	},
	setupController: function(controller, model) {
		controller.set('model', model);
	},
	actions: {
		removeAnswer: function(model) {
			console.log('Delete from route');
			model.destroyRecord();
		}
	}
});
/* global $ */

Quizmaker.QuizzesController = Ember.ObjectController.extend({
});

Quizmaker.NewController = Ember.ObjectController.extend({
	content: {},
	quiztypes: ['Multiple choice', 'Checklist', 'Either/or'],
	actions: {
		save: function(){

			var store = this.get('store');
			var model = this.get('model');

			var title = this.get('title');
			var excerpt = this.get('excerpt');
			var quiztype = this.get('quiztype');
			var fullname = this.get('fullname');
			var submittedOn = new Date();

			if (Ember.isEmpty(title)) {
				window.alert('Please enter a title');
				return false;
			} else if (Ember.isEmpty(quiztype)) {
				window.alert('Please enter a quiz type');
				return false;
			}
			var quiz = store.createRecord('quiz',{
				title : title,
				excerpt : excerpt,
				fullname : fullname,
				quiztype : quiztype,
				submittedOn : submittedOn
			});
			quiz.save();
			this.transitionToRoute('index');
		},
		cancel: function(){
			this.transitionToRoute('index');
		},
		createQuestion: function(){
			var store = this.get('store');
			var question = store.createRecord('question',{
				question : ''
			});
            var questions = this.get('questions');
            questions.pushObject(question);
            // questions.save();
			// questions.invoke('save'); //this seems to work
			// model.set('questions', questions);
		}
	}
});


Quizmaker.QuizIndexController = Ember.ObjectController.extend({
	actions: {
		remove: function(){
			if (window.confirm('Are you sure you want to delete this quiz?')){
				var quiz = this.get('model');
				quiz.destroyRecord();
				this.transitionToRoute('index');
			}
		}
	}
});
Quizmaker.QuizEditController = Ember.ObjectController.extend({
	quiztypes: ['Multiple choice', 'Checklist', 'Boolean'],
	actions: {
		doneEditing: function(){
			var model = this.get('model');

			if (Ember.isEmpty(model.get('title'))) {
				window.alert('Please enter a title');
				return false;
			} else if (Ember.isEmpty(model.get('quiztype'))) {
				window.alert('Please enter a quiz type');
				return false;
			} else {
				var quizPromise = model.save();
				
				var questionPromises = model.get('questions').map(function(question) {
					return question.save();
				});

				Ember.RSVP.all([quizPromise].concat(questionPromises)).then(function() {
					this.transitionToRoute('quiz');	
				}.bind(this), function(error) {
					Ember.Logger.error(error);
				});
			}
		},
		cancel: function(){
			// if (window.confirm('Are you sure you want to abandon your changes?')){
			// }
			this.get('model').rollback();
			this.transitionToRoute('quiz');
		},
		// duplicate from QuestionsController
		createQuestion: function(){
			var store = this.get('store');
			var question = store.createRecord('question',{
				question : ''
			});
            var questions = this.get('questions');
            questions.pushObject(question);
			questions.invoke('save'); //this seems to work
			// var model = this.get('model');
			// model.set('questions', questions);
		},
		removeQuestion: function(model){
	        // var question = this.findProperty('id', id);
	        // this.removeObject(question);
			model.destroyRecord();
		},

		createAnswer: function(){
			var store = this.get('store');
			var answer = store.createRecord('answer',{
				answer : ''
			});
            var answers = this.get('answers');
            answers.pushObject(answer);
			answers.invoke('save');
		},
		removeAnswer: function(model){
			model.destroyRecord();
		}
	}
});

// The Questions page doesn't work when this is uncommented:

// Quizmaker.QuestionsController = Ember.ArrayController.extend({
// 	needs: 'quiz',
// 	quiz: Ember.computed.alias("controllers.quiz"),
// 	actions: {
// 		createQuestion: function(){
// 			var store = this.get('store');
// 			var question = store.createRecord('question',{
// 				question : 'Test question ' + new Date()
// 			});
//             var quiz = this.get('quiz');
//             var questions = quiz.get('questions');
//             questions.pushObject(question);
// 		},
// 		removeQuestion: function(id){
// 	        var question = this.findProperty('id', id);
// 	        this.removeObject(question);
// 		}
// 	}
// });
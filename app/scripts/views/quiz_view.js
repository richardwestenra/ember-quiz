Quizmaker.QuizEditView = Ember.View.extend({
	keyDown: function(e) {
		var esc = 27;
		if(e.keyCode === esc){
			this.get('controller').send('cancel');
		}
	}
});

// Give the text fields one way value binding so they don't automatically update
// Quizmaker.TextField = Ember.TextField.extend({
// 	valueBinding: Ember.Binding.oneWay('source')
// });
// Quizmaker.TextArea = Ember.TextArea.extend({
// 	valueBinding: Ember.Binding.oneWay('source')
// });
// Quizmaker.Select = Ember.Select.extend({
// 	valueBinding: Ember.Binding.oneWay('source')
// });
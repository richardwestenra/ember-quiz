Quizmaker.Router.map(function () {
	// Add your routes here
	this.resource('index',{path : '/'});
	this.resource('new' , {path : '/quiz/new'});
	this.resource('quizzes' , {path : '/quizzes'});
	this.resource('questions' , {path : '/questions'});
	// this.resource('answers' , {path : '/answers'});

	this.resource('quiz', { path: '/quiz/:quiz_id' }, function(){
		this.route('edit', { path: '/edit' });
	});
});
/**
  * Quizzes controller.
  */
App.QuizzesController = Em.ObjectController.extend({
  quiztypes: [
    'Multiple choice',
    'Checklist',
    'Either/or'
  ]
});


/**
  * Quizzes index controller.
  */
App.QuizzesIndexController = Em.ArrayController.extend({
  needs: ['quizzes']
});


/**
  * Quizzes new controller.
  */
App.QuizzesNewController = Em.ArrayController.extend({
  needs: ['quizzes']
});
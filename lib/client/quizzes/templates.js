function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['quizzes'] = compile('./templates/quizzes');
Em.TEMPLATES['quizzes/index'] = compile('./templates/quizzes-index');
Em.TEMPLATES['quizzes/new'] = compile('./templates/quizzes-new');
Em.TEMPLATES['components/char-count'] = compile('./templates/char-count');
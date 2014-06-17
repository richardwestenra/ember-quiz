function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['quiz'] = compile('./templates/quiz');
Em.TEMPLATES['quiz/index'] = compile('./templates/quiz-index');

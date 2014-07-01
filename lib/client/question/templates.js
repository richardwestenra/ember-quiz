function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['question'] = compile('./templates/question');
Em.TEMPLATES['question/index'] = compile('./templates/question-index');

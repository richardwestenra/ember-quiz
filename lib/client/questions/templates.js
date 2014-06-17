function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['questions'] = compile('./templates/questions');
Em.TEMPLATES['questions/index'] = compile('./templates/questions-index');

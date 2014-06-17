function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['answers'] = compile('./templates/answers');
Em.TEMPLATES['answers/index'] = compile('./templates/answers-index');

function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['answer'] = compile('./templates/answer');
Em.TEMPLATES['answer/index'] = compile('./templates/answer-index');

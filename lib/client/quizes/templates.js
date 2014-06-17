function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['quizes'] = compile('./templates/quizes');
Em.TEMPLATES['quizes/index'] = compile('./templates/quizes-index');

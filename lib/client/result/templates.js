function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['result'] = compile('./templates/result');
Em.TEMPLATES['result/index'] = compile('./templates/result-index');

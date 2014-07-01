function compile (t){
  return Em.Handlebars.compile(require(t));
};

Em.TEMPLATES['results'] = compile('./templates/results');
Em.TEMPLATES['results/index'] = compile('./templates/results-index');

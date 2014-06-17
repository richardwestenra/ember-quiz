/**
  * Require and compile `template`
  */
function compile (template){
  return Em.Handlebars.compile(require(template));
};

// compile

Em.TEMPLATES['application'] = compile('./templates/application');
Em.TEMPLATES['index'] = compile('./templates/index');

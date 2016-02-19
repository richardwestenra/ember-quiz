/**
  * Module dependencies.
  */
var build = require('./build');

module.exports = function(component){
  return function(req, res, next){
    if (!config.dev) return next();
    build(component, false, next);
  }
};
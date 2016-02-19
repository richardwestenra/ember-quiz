/**
  * Module dependencies.
  */
var debug = require('debug')('builder:build');
var builder = require('component-hooks');
var join = require('path').join;


/**
  * Build components and invoke `done(err)`.
  *
  * @param {String}   component
  * @param {Boolean}  minify - whether to minify assets
  * @param {Function} done - callback
  */
module.exports = function(component, minify, done){
  
  var out = join(__dirname, '..', '..', 'public');
  var cwd = join(__dirname, '..', '..', 'client', component);
  var build = builder(cwd)
    .copy()
    .log()
    .name(component)
    .standalone()
    .out(out);
    
  if (!minify) build.dev();

  debug('building '+component+' with minification '+minify);

  build.end(function(err){
    if (err) err.message = component + ': ' + err.message;
    done(err);
  });

};
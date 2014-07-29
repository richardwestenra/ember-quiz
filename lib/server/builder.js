/**
  * Module dependencies.
  */
var debugs = require('./debugs');
var builder = require('component-hooks');
var join = require('path').join;
var config = require('../../config');
var Batch = require('batch');


/**
  * Build components and invoke `next(err)`.
  *
  * @param {Function} next - callback
  */
module.exports = function(next){

  if (process.env.NODE_ENV == 'production') return next();

  var out = join(__dirname+'/../../public');
  var start = new Date;
  var batch = new Batch;
  var components = config.components;
  var minification = (!!process.env.MINIFY)
    ? 'on'
    : 'off';

  components.forEach(function(component){
    batch.push(function(done){

      var cwd = join(__dirname, '/../client/'+component);
      var build = builder(cwd)
        .copy()
        .name(component)
        .standalone()
        .out(out);
        
      if (minification == 'off') build.dev();

      debugs.builder('building components to '+cwd+'/public with minification '+minification);

      build.end(done);

    });
  });

  batch.end(function(err){
    if (err) return next(new Error(err.message));
    var duration = new Date - start;
    debugs.builder('built in '+duration+' ms');
    next();
  });


};


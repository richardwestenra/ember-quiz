/**
  * Module dependencies.
  */
var debugs = require('./debugs');
var builder = require('component-hooks');
var join = require('path').join;
var config = require('../../config');


/**
  * Build components and invoke `next(err)`.
  *
  * @param {Function} next - callback
  */
module.exports = function(next){

  if (process.env.NODE_ENV == 'production') return next();

  var out = join(__dirname+'/../../public');
  var cwd = join(__dirname, '/../../');
  var build = builder(cwd)
    .copy()
    .out(out)
    .log();

  if (!process.env.MINIFY) build.dev();

  build.end(next);

};


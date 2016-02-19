/**
  * Module dependencies.
  */
var fs = require('fs');
var join = require('path').join;
var debug = require('debug')('app:config');

// config

global.config = {};

config.secret = 'sdertrtythfbgdbvxczf5tghrgdfetghyrfg44trgfer+d/grfver';

config.dev = process.env.NODE_ENV !== 'production';

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return !(/^\./.test(file)) && 'index.js' !== file;
  })
  .forEach(function(file){
    try{
      require(join(__dirname, file));
    } catch (e){
      debug('failed to load mod %s %s', file, e.message);
      throw e;
    }
  });
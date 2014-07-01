/**
  * Module dependencies.
  */
var debug = require('debug');

// debugs

['main', 'models', 'builder', 'routes'].forEach(function(logger){
  exports[logger] = debug('cms:'+logger);
});

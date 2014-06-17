var debug = require('debug');

['main', 'models', 'builder', 'routes'].forEach(function(logger){
  exports[logger] = debug('cms:'+logger);
});

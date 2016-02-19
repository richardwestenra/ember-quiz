/**
  * Module dependencies.
  */
require('ember');

/**
  * Expose.
  */
module.exports = function(to, opts) {
  var U = Em.Namespace.create({
    to: to,
    opts: opts
  });
  require('./progress')(U);
  require('./drop')(U);
  require('./upload')(U);
  return U;
};

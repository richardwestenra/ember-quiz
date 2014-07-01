/**
  * Module dependencies.
  */
var Batch = require('batch');

exports.any = function(req, done) {
  if (!req.user){
    return done(404);
  }
  done();
};

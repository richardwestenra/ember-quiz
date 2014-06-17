/**
  * Module dependencies.
  */
var fs = require('fs');
var express = require('express');
var config = require('../../config');
var debugs = require('./debugs');
var jade = require('component-hooks/node_modules/jade');
var Batch = require('batch');
var models = require('./models');
var builder = require('./builder');
var path = require('path');
var slug = require('slug-component');


// app

var app = module.exports = express();

// settings

app.configure(function(){
  app.engine('jade', jade.__express);
  app.set('view engine', 'jade');
  app.set('views', __dirname+'/views');
  app.locals({config: config});
});

// GET /

app.get('/', function(req, res){
  builder(function(err){
    if (err) return res.send(500, err.message);
    res.render('index')
  });
});

// GET /upload

app.post('/upload', function(req, res, next) {
  var file = req.files.file;
  if (!!!file) return res.send(400);

  var input = file.path;
  var outputName = (new Date).toISOString() + '-' + file.originalFilename;
  var output = path.join(
    __dirname,
    '/../../tmp/images/',
    outputName
  );

  upload(input, output, done);

  function done(err){
    if (err) return next(err);
    res.send('/images/'+outputName);
  }

});

// upload

function upload(input, output, done){
  debugs.routes('uploading %s to %s', input, output);
  fs.readFile(input, function (err, data) {
    fs.writeFile(output, data, done);
  });
};
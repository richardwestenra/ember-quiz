/**
  * Module dependencies.
  */
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

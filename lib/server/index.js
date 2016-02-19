/**
  * Module dependencies.
  */
var fs = require('fs');
var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var join = require('path').join;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var serveStatic = require('serve-static');
var methodOverride = require('method-override');
var join = require('path').join;
var jade = require('jade');
var builder = require('./builder');
var debug = require('debug')('app:web');

// app

var app = module.exports = express();

// settings

app.engine('jade', jade.__express);
app.set('view engine', 'jade');
app.set('views', __dirname+'/views');
app.locals.config = config;

// middleware

app.use(favicon(join(__dirname, '/assets/favicon.ico'), {maxAge: 0}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride());
app.use(serveStatic(join(__dirname, '/../public')));
app.use(serveStatic(join(__dirname, '/../../tmp')));
app.use(config.session);

// mount

fs
  .readdirSync(join(__dirname, 'middlewares'))
  .forEach(function (file) {
    if (/^\./.test(file)) return;
    require('./middlewares/' + file)(app);
  });

// in

app.use(require('./auth/passport'));
config.apis.discover(app);

// GET /

app.get('/', builder('app'), function(req, res, next){
  res.render('index');
});

// 404

app.use(function(req, res, next){
  var err = new Error('404');
  err.status = 404;
  next(err);
});

// error

app.use(function(err, req, res, next){
  // res.send(err.status || 500, err.stack);
  // debugs.api(err.stack);
  debug(err.stack);
  res.send(err.status || 500, err.message);
});

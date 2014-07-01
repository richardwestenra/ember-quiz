/**
  * Module dependencies.
  */
var Strategy = require('passport-http').BasicStrategy;
var express = require('express');
var config = require('../../config');
var passport = require('passport');
var models = require('./models');
var debugs = require('./debugs');
var admin = config.admin;

// strategy

var strategy = new Strategy(function(username, password, done) {
  if (username !== admin.username || password !== admin.password){
    return done(null, false);
  }
  return done(null, admin);
});

passport.serializeUser(function(user, done) {
  return done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  if (admin.username !== username) return done(null, false)
  return done(null, admin);
});

passport.use(strategy);

// app

var app = module.exports = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('basic'));
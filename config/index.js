/**
  * Module dependencies.
  */
var fs = require('fs');
var AWS = require('aws-sdk');

// config

var config = {
  port: 5000,
  secret: 'sdertrtythfbgdbvxczf5tghrgdfetghyrfg44trgfer+d/grfver',
  admin: {
    username: 'admin',
    password: 'cmS45.=14.Daf9'
  },
  title: 'Quiz Maker',
  mongo: process.env.MONGOLAB_URI || 'mongodb://localhost/quiz-maker',
  site: 'http:\/\/localhost:5000',
  components: [
    'app',
    'out'
  ],
  bucket: 'quiz-maker'
};

if (process.env.NODE_ENV == 'production'){
  config.site = 'http:\/\/boiling-harbor-8354\.herokuapp\.com';
}

// expose

module.exports = config;

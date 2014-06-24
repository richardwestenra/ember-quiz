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

AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
AWS.config.secretAccessKey = process.env.AWS_ACCESS_KEY_ID;
AWS.config.region = process.env.AWS_S3_REGION || 'us-west-2';

if (process.env.NODE_ENV == 'production'){
  config.site = 'http:\/\/boiling-harbor-8354\.herokuapp\.com';
}

// expose

module.exports = config;

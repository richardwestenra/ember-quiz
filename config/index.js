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
  S3: {
    policy: 'ewogICdleHBpcmF0aW9uJzogJzIwMjAtMDEtMDFUMDA6MDA6MDBaJywKICAnY29uZGl0aW9ucyc6IFsgCiAgICB7J2J1Y2tldCc6ICdxdWl6bWFrZXInfSwgCiAgICB7J2FjbCc6ICdwdWJsaWMtcmVhZCd9LAogICAgWydzdGFydHMtd2l0aCcsICckQ29udGVudC1UeXBlJywgJyddLAogICAgWydzdGFydHMtd2l0aCcsICckQ29udGVudC1MZW5ndGgnLCAnJ10sCiAgICBbJ3N0YXJ0cy13aXRoJywgJyRrZXknLCAnJ10sCiAgICBbJ2NvbnRlbnQtbGVuZ3RoLXJhbmdlJywgMCwgMTA0ODU3Nl0KICBdCn0=',
    signature: 'AeLDP58hSL8UOHa6MzWvFhIRS0w=',
    url: 'http://quizmaker.s3.amazonaws.com',
    awsKey: process.env.QUIZMAKER_AWS_ACCESS_KEY_ID,
    acl: 'public-read'
  }
};

if (process.env.NODE_ENV == 'production'){
  config.site = 'http:\/\/boiling-harbor-8354\.herokuapp\.com';
}

// expose

module.exports = config;

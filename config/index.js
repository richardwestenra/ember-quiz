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
    policy: 'ewogICdleHBpcmF0aW9uJzogJzIwMjAtMDEtMDFUMDA6MDA6MDBaJywKICAnY29uZGl0aW9ucyc6IFsgCiAgICB7J2J1Y2tldCc6ICdxdWl6LW1ha2VyLTInfSwgCiAgICB7J2FjbCc6ICdwdWJsaWMtcmVhZCd9LAogICAgWydzdGFydHMtd2l0aCcsICckQ29udGVudC1UeXBlJywgJyddLAogICAgWydzdGFydHMtd2l0aCcsICckQ29udGVudC1MZW5ndGgnLCAnJ10sCiAgICBbJ3N0YXJ0cy13aXRoJywgJyRrZXknLCAnJ10sCiAgICBbJ2NvbnRlbnQtbGVuZ3RoLXJhbmdlJywgMCwgMTA0ODU3Nl0KICBdCn0=',
    signature: 'iFsnSFbIQHYng+ffNxKVaHeDar0=',
    url: 'http://quiz-maker-2.s3-us-west-2.amazonaws.com/',
    key: process.env.QUIZMAKER_AWS_ACCESS_KEY_ID,
    acl: 'public-read',
    staticUrl: 'https://s3-us-west-2.amazonaws.com/quiz-maker-2/'  
  }
};

if (process.env.NODE_ENV == 'production'){
  config.site = 'http:\/\/boiling-harbor-8354\.herokuapp\.com';
}

// expose

module.exports = config;

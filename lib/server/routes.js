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

// out

app.use('/out', require('./apis'));
app.get('/out', function(req, res){

  var id = req.query.quiz;
  var quiz = {};
  var batch = new Batch;

  // serial

  batch.concurrency(1);

  // build

  batch.push(builder);

  // // find quiz

  batch.push(function(done){
    debugs.routes('finding quiz %s', id);
    models.Quiz.findById(id, function(err, q){
      if (err) return done(err);
      if (!q){
        var err = new Error('quiz not found');
        return done(err);
      }
      debugs.routes('found quiz %s', q._id);
      quiz.title = q.title;
      quiz.image = q.image;
      quiz.questions = [];
      done();
    });
  });

  // find questions

  batch.push(function(done){
    var conditions = {
      quiz: id
    };
    debugs.routes('finding questions %s', JSON.stringify(conditions));
    models.Question.find(conditions, null, null, function(err, questions){

      if (err) return done(err);

      questions = questions || [];
      debugs.routes('found questions %s', questions.length);

      var batch = new Batch;

      // serial

      batch.concurrency(1);

      questions.forEach(function(qs){

        var conditions = {
          question: qs._id
        };
        
        var question = {
          _id: qs._id,
          title: qs.title,
          image: qs.image
        };
        
        // answers

        batch.push(function(cb){
          debugs.routes('finding answers for %s', question._id);
          models.Answer.find(conditions, function(err, answers){
            if (err) return cb(err);
            debugs.routes('found answers for %s %s', question._id, answers.length);
            question.answers = answers;
            cb();
          });
        });

        // results

        batch.push(function(cb){
          debugs.routes('finding results for %s', question._id);
          models.Result.find(conditions, function(err, results){
            if (err) return cb(err);
            debugs.routes('found results for %s %s', question._id, results.length);
            question.results = results;
            cb();
          });
        });

        // append question

        batch.push(function(cb){
          debugs.routes('adding question %s', question._id);
          quiz.questions.push(question);
          cb();
        });

      });

      // end

      batch.end(done);

    });
  });

  batch.end(function(err){
    if (err) return res.send(500, err.stack);
    res.render('out', {
      quiz: quiz
    });
  });

});

// in

app.use(require('./strategy'));
app.use(require('./apis'));

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
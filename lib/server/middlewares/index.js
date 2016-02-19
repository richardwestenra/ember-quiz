/**
  * Module dependencies.
  */
var fs = require('fs');
var debug = require('debug')('app:out');
var Batch = require('batch');
var builder = require('../builder');
var path = require('path');
var slug = require('slug-component');


module.exports = function(app){

  var models = config.models;
  
  app.get('/out', builder('out'), function(req, res, next){

    var id = req.query.quiz;
    var quiz = {};
    var conditions = {
      quiz: id
    };
    var batch = new Batch;

    // serial

    batch.concurrency(1);

    // find quiz

    batch.push(function(done){
      debug('finding quiz %s', id);
      models.Quiz.findById(id, function(err, q){
        if (err) return done(err);
        if (!q){
          var err = new Error('quiz not found');
          return done(err);
        }
        debug('found quiz %s', q._id);
        quiz.title = q.title;
        quiz.type = q.quizType;
        quiz.fullName = q.fullName;
        quiz.excerpt = q.excerpt;
        quiz.image = q.image;
        quiz.metaTitle = q.metaTitle;
        quiz.metaDesc = q.metaDesc;
        quiz.metaImage = q.metaImage;
        quiz.url = q.url;
        quiz.questions = [];
        quiz.metaTweet = q.metaTweet;
        done();
      });
    });

    // find questions

    batch.push(function(done){
      debug('finding questions %s', JSON.stringify(conditions));
      models.Question.find(conditions, null, null, function(err, questions){

        if (err) return done(err);

        questions = questions || [];
        debug('found questions %s', questions.length);

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
            image: qs.image,
            excerpt: qs.excerpt
          };
          
          // answers

          batch.push(function(cb){
            debug('finding answers for %s', question._id);
            models.Answer.find(conditions, function(err, answers){
              if (err) return cb(err);
              debug('found answers for %s %s', question._id, answers.length);
              question.answers = answers;
              cb();
            });
          });

          // append question

          batch.push(function(cb){
            debug('adding question %s', question._id);
            quiz.questions.push(question);
            cb();
          });

        });

        // end

        batch.end(done);

      });
    });

    // find results

    batch.push(function(cb){
      debug('finding results for %s', quiz._id);
      models.Result.find(conditions, function(err, results){
        if (err) return cb(err);
        debug('found results for %s %s', quiz._id, results.length);
        quiz.results = results;
        cb();
      });
    });

    batch.end(function(err){
      if (err) return next(err);
      var prod = !config.dev;
      res.render('out', {
        quiz: quiz,
        quiz_str: JSON.stringify(quiz),
        prod: prod
      });
    });

  });

};


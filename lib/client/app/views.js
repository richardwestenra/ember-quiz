/**
  * Module dependencies.
  */
var page = require('ember-page');
var link = require('ember-link');
var thumb = require('ember-thumb');
var autofill = require('ember-autofill-fix');
var upload = require('ember-upload');
var slug = require('slug');

/**
  * Apply mixin
  */
Em.TextSupport.reopen(autofill, {
  attributeBindings: ['required']
});


/**
  * Link view
  */
App.LinkView = Em.View.extend(link);


/**
  * Image view
  */
App.ImageView = Em.View.extend(thumb);


/**
  * Upload view
  */
App.UploadView = Em.View.extend({
  template: Em.TEMPLATES.upload,
  init: function(){

    var self = this;
    var key = slug((new Date).toISOString());
    var opts = {
      'key': key,
      'AWSAccessKeyId': S3.key,
      'acl': S3.acl,
      'policy': S3.policy,
      'signature': S3.signature,
      'Content-Type': 'application/octet-stream'
    };

    this.upload = upload(S3.url, opts);
    this.upload.addObserver('upload.loadend', function(){
      Em.run.later(function(){
        var path = S3.staticUrl + key;
        self.set('record.image', path);
      }, 2000);
    });

    this._super();

  }
});
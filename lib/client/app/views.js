/**
  * Module dependencies.
  */
var page = require('ember-page');
var link = require('ember-link');
var thumb = require('ember-thumb');
var autofill = require('ember-autofill-fix');
var upload = require('ember-upload');

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
    this.upload = upload('/upload');
    this.upload.addObserver('upload.loadend', function(){
      var path = this.get('upload.loadend.currentTarget.responseText');
      self.set('image', path);
    });

    this._super();

  }
});
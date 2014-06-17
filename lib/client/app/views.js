/**
  * Module dependencies.
  */
var page = require('ember-page');
var link = require('ember-link');
var thumb = require('ember-thumb');
var autofill = require('ember-autofill-fix');


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
  * User avatar view
  */
App.AvatarView = Em.View.extend(thumb, {
  src: function(){
    var src = this.get('_src');
    if (!src) return;
    return src
      .replace('[width]', this.get('width'))
      .replace('[height]', this.get('height'));
  }.property('_src')
});

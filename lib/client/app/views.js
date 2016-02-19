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
  
  attributeBindings: ['required', 'readonly'],

  didInsertElement: function(){
    
    this._super();
    this.$().on('focus', this.onfocus.bind(this));
    this.$().on('blur', this.onblur.bind(this));

  },

  onfocus: function(){
    this.set('showLimit', true);
  },

  onblur: function(){
    this.set('showLimit', false);
  }

});


/**
  * Link view
  */
App.LinkView = Em.View.extend(link);


/**
  * Preview link view
  */
App.PreviewLinkView = App.LinkView.extend({
  target: 'external',
  href: function(){
    return '/out?quiz='+this.get('quiz.id');
  }.property('quiz')
});


/**
  * Image view
  */
App.ImageView = Em.View.extend(thumb);


/**
  * Upload view
  */
App.UploadView = Em.View.extend({
  
  template: Em.TEMPLATES.upload,

  optImagePath: 'image',

  setImage: function(){
    var imagePath = this.get('optImagePath');
    var image = this.get('record.'+imagePath);
    this.set('image', image);
  },

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

    this.setImage();
    this.upload = upload(S3.url, opts);
    this.upload.addObserver('upload.progress', function(e){
      var progress = Number(self.upload.get('upload.progress')) || 0;
      // console.log(progress);
      if (99 > progress) return;

      Em.run.later(function(){
        var path = S3.staticUrl + key;
        var imagePath = self.get('optImagePath');
        console.log(path);
        self.set('record.'+imagePath, path);
        self.setImage();
      }, 1000);
    });

    this._super();

  }
});


App.PopoverMixin = Em.Mixin.create({

  didInsertElement: function(){
    
    this._super();

    $('.popover-dismiss').popover({
      trigger: 'hover focus'
    });

  }

});

/**
  * Module dependencies.
  */
require('ember');
var Progress = require('progress');

/**
  * Expose.
  */
module.exports = Em.Mixin.create({
  
  size: 100,
  
  progress: 0,
  
  didInsertElement: function(){
    
    this._super();

    var progress = new Progress;
    progress.size(this.get('size'));
    this.set('el', progress);
    this.$().html(progress.el);
    this.addObserver('progress', this.onprogress);
    
  },

  onprogress: function(){
    var progress = this.get('progress');
    this.get('el').update(progress);
  }

});

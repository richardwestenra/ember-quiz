/**
  * Module dependencies.
  */
var Clip = require('clipboard-dom');
Clip.swf('/component-clipboard-dom/ZeroClipboard.swf');

App.CopyToClipboardView = Em.View.extend({

  didInsertElement: function () {

    this._super();

    var quiz = this.get('quiz');
    var el = this.$()[0];
    var parent = el.parentNode;
    var clip = new Clip(el, parent);
    clip.text(quiz.toIframe());
    clip.on('complete', function () {
      alert('Copied to clipboard.');
    });

  },

});

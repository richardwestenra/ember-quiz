/**
  * Module dependencies.
  */
var Clip = require('clipboard-dom');
Clip.swf('/component-clipboard-dom/ZeroClipboard.swf');


App.IndentView = Em.View.extend({

  classNameBindings: [
    'indent'
  ],

  indent: function(){

    return (this.get('quiz.quizType') == 1)
      ? 'col-sm-12'
      : 'col-sm-offset-1 col-sm-11'

  }.property('quiz.quizType')

});

App.CopyToClipboardView = Em.View.extend({

  label: 'Copy to clipboard',

  didInsertElement: function () {

    var self = this;
    this._super();
    this.addObserver('quiz.id', function(){
      Em.run.later(next, 1000);
    });

    function next(){
        
      var quiz = self.get('quiz');
      if (!quiz) return;

      var el = self.$()[0];
      var parent = el.parentNode;
      var clip = new Clip(el, parent);
      clip.text(quiz.toIframe());
      clip.on('complete', function () {
        self.set('label', 'Copied to clipboard!');
      });
    
    }

  },

});

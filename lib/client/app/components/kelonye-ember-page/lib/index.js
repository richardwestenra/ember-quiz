var select = require('ember-select');
var compile = Em.Handlebars.compile;

module.exports = Em.Mixin.create(select, {
  classNames: ['component-page'],
  label: function(){
    var content = '' + this.get('item');
    var last = '' + this.get('items.lastObject');
    var numOfZerosToPrepend = last.length - content.length;
    while (numOfZerosToPrepend--){
      content = '0' + content;
    }
    return content;
  }.property('item'),
  template: compile('{{view.label}}')
});
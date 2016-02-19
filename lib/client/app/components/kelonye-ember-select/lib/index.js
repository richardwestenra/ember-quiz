require('ember');
var compile = Em.Handlebars.compile;

module.exports = Em.Mixin.create({
  classNameBindings: ['active'],
  active: (function() {
    var prop = this.get('optionSelectPath');
    if (prop){
      prop = '.'+prop;
    } else {
      prop = '';
    }
    var content = this.get('item'+prop);
    var selected = this.get('items.selected'+prop);
    return content === selected;
  }).property('items.selected'),
  click: function(e) {
    var content = this.get('item');
    this.set('items.selected', content);
  }
});

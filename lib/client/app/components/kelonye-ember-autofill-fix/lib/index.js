require('ember');

// wait for autofill to happen

var wait = 5; // ms

// view mixin

module.exports = Em.Mixin.create({

  didInsertElement: function(){

    var el = this.$()[0];
    var id = setTimeout(function(){
      clearTimeout(id);
      var view = Ember.View.views[el.id];
      view.set('value', el.value);
    }, wait);

  }

});
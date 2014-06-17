// router

App.Adapter = require('ember-mongoose').extend({
  pathForType: function(type) {
    switch (type){
      case 'quiz':
        return 'quizs';
      default:
        return this._super(type);
    }
  }
});

// store

App.Store = DS.Store.extend({
  adapter: App.Adapter
});
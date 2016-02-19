// router

App.Adapter = require('ember-mongoose').extend({

});

// store

App.Store = DS.Store.extend({
  adapter: App.Adapter
});
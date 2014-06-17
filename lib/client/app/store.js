// router

App.Adapter = require('ember-mongoose');

// store

App.Store = DS.Store.extend({
  adapter: 'App.Adapter'
});
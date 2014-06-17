App.Category = Em.Object.extend({
  name: function(){
    return this
      .get('category_slug')
      .replace(/-/g, ' ')
      .capitalize();
  }.property('category_slug'),
});
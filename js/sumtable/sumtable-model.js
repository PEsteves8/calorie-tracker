var app = app || {};

app.AddedItem = Backbone.Model.extend({
  defaults: {
    name: "",
    calories: 0
  }
});

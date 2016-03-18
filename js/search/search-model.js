var app = app || {};

app.SearchItem = Backbone.Model.extend({
  defaults: {
    name: "",
    brand: "",
    calories: 0
  }
});

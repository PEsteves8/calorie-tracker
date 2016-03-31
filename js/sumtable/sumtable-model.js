var app = app || {};

app.AddedItem = Backbone.Model.extend({
  defaults: {
    name: "",
    brand: "",
    calories: 0,
    date: "",
    grams: ""

  }
});

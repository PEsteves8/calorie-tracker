var app = app || {};

app.AddedView = Backbone.View.extend({

  tagName: 'li',

  template:  _.template( $('.added-item-template').html() ),

  events: {
    "click .remove-button" : 'removeItem'
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);

  },

  render: function() {
    this.$el.html( this.template( { name: this.model.attributes.name, calories: this.model.attributes.calories }  ) );
    return this;
  },

  removeItem: function() {
    app.SumTable.totalCalories -= this.model.attributes.calories;
    this.model.destroy();
  }

})

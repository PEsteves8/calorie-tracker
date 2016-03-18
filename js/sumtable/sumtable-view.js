var app = app || {};

app.AddedView = Backbone.View.extend({

  tagName: 'li',

  template:  _.template( $('.added-item-template').html() ),

  events: {
    "click .remove-button" : 'removeItem'
  },

  initialize: function() {
    this.listenTo(app.GlobalEvents, 'removePrevViews', this.remove);
    this.listenTo(this.model, 'destroy', this.remove);

  },

  render: function() {
    this.$el.html( this.template( { name: this.model.attributes.name, calories: this.model.attributes.calories, brand: this.model.attributes.brand }  ) );
    return this;
  },

  removeItem: function() {
    this.model.destroy();
  },

})

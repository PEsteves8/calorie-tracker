var app = app || {};

app.SearchView = Backbone.View.extend({

  tagName: 'li',

  template:  _.template( $('.search-item-template').html() ),

  events: {
    "click" : 'addItem'
  },

  initialize: function() {
      this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
     this.$el.html( this.template( { name: this.model.attributes.fields.item_name, calories: this.model.attributes.fields.nf_calories }  ) );
     return this;
   },

   addItem: function() {
     app.SumTable.totalCalories += this.model.attributes.fields.nf_calories; 
     app.SumTable.add( new app.AddedItem({name: this.model.attributes.fields.item_name, calories: this.model.attributes.fields.nf_calories}));

   } // @TODO use create for local storage

})

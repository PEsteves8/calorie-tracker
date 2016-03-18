var app = app || {};

app.SearchView = Backbone.View.extend({

  tagName: 'li',

  template:  _.template( $('.search-item-template').html() ),

  events: {
    "click" : 'addItem'
  },


  render: function() {
     this.$el.html( this.template( { name: this.model.attributes.fields.item_name, calories: this.model.attributes.fields.nf_calories, brand: this.model.attributes.fields.brand_name }  ) );
     return this;
   },

   addItem: function() {

     app.SumTable.create({
       name: this.model.attributes.fields.item_name,
       brand: this.model.attributes.fields.brand_name,
       calories: this.model.attributes.fields.nf_calories,
       date: $.datepicker.formatDate("yy-mm-dd", $( "#datepicker" ).datepicker( "getDate" ) )
     });
   }
 });



app.SearchResults = new SearchResultsList();

var app = app || {};


var SumTableList = Backbone.Collection.extend({

  model: app.AddedItem,

  localStorage: new Backbone.LocalStorage('calorie-tracker'),

  filterByDate: function() {
     return this.filter(function( model ) {
       return model.get('date') == $.datepicker.formatDate("yy-mm-dd", $( "#datepicker" ).datepicker( "getDate" ) );
     })
   }

});

app.SumTable = new SumTableList();

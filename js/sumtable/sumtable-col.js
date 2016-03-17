var app = app || {};


var SumTableList = Backbone.Collection.extend({

  model: app.AddedItem,

  filterByDate: function() {
     return this.filter(function( model ) {
       return model.get('date') == $.datepicker.formatDate("yy-mm-dd", $( "#datepicker" ).datepicker( "getDate" ) );
     })
   }

});

app.SumTable = new SumTableList();

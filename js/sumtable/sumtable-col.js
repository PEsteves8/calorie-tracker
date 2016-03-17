var app = app || {};


var SumTableList = Backbone.Firebase.Collection.extend({

  model: app.AddedItem,

  url: "https://shining-fire-9576.firebaseIO.com",

  filterByDate: function() {
     return this.filter(function( model ) {
       return model.get('date') == $.datepicker.formatDate("yy-mm-dd", $( "#datepicker" ).datepicker( "getDate" ) );
     })
   }

});

app.SumTable = new SumTableList();

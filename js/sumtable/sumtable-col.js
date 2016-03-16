var app = app || {};


var SumTableList = Backbone.Collection.extend({

  model: app.AddedItem,

});

app.SumTable = new SumTableList();

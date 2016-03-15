var app = app || {};


var SumTableList = Backbone.Collection.extend({

  model: app.AddedItem,

  totalCalories: 0,

});

app.SumTable = new SumTableList();

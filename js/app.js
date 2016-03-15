var app = app || {};

app.AppView = Backbone.View.extend({

  el: ".calorie-app",

  sumTemplate: _.template( $('.sum-template').html() ),

  events: {
    "click .submit-button" : "doSearch",

  },

  initialize: function() {
    this.listenTo(app.SumTable, 'add', this.addToTable);
    this.listenTo(app.SumTable, 'add', this.renderTotal);
    this.listenTo(app.SumTable, 'remove', this.renderTotal);
},



  doSearch: function() {

    app.SearchResults.foodName = $(".search-input").val().trim();
    app.SearchResults.fetch({
            success: function (response, xhr) {
                this.renderSearch();
            }.bind(this),
            error: function (errorResponse) {
                console.log(errorResponse)
            }
        });
  },

  renderTotal: function() {
    $(".total-calories").html(app.SumTable.totalCalories);
  },

  renderSearch: function() {

    var searchView;
    //console.log(app.SearchResults.models);
    $(".search-results").html('');
    for (var n in app.SearchResults.models ) {
      searchView = new app.SearchView({model: app.SearchResults.models[n]});
      $(".search-results").append(searchView.render().el);
    }},

  addToTable: function() {
    console.log(app.SumTable.totalCalories);
    var addedView;
    var n = _.findLastIndex(app.SumTable.models);
    addedView = new app.AddedView({model: app.SumTable.models[n]});
    $(".added-items-list").append(addedView.render().el);
}
});


$(function() {
 new app.AppView();
});

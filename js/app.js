var app = app || {};

app.AppView = Backbone.View.extend({

  el: ".calorie-app",

  sumTemplate: _.template($('.sum-template').html()),

  events: {
    "click .submit-button": "doSearch",
    "keypress .search-input" : "searchOnEnter"
    },

  initialize: function() {

    $('#datepicker').datepicker({onSelect: function(dateStr) {
      console.log($(this).datepicker('getDate'));
    }});

    this.listenTo(app.SumTable, 'add', this.addToTable);
    this.listenTo(app.SumTable, 'add', this.renderTotal);
    this.listenTo(app.SumTable, 'remove', this.renderTotal);
  },

  searchOnEnter: function( e ) {
    if ( e.which === 13 ) {
        this.doSearch();
      }
    },

  doSearch: function() {
    app.SearchResults.foodName = $(".search-input").val().trim();
    app.SearchResults.fetch({
      success: function(response, xhr) {
        this.renderSearch();
      }.bind(this),
      error: function(errorResponse) {
        console.log(errorResponse)
      }
    });
  },

  renderTotal: function() {
  var totalCalories = 0;
  app.SumTable.each(function(model) {
    totalCalories += model.get('calories');

  });
  $(".total-calories").html(totalCalories);
  },

  renderSearch: function() {

    var searchView;
    $(".search-results").html('');

    if (app.SearchResults.length < 1) {
      $(".search-results").append("No results found");
      return;}

    app.SearchResults.each(function(model) {
        searchView = new app.SearchView({
        model: model
      });

      $(".search-results").append(searchView.render().el);
    });

  },

  addToTable: function() {
  //  console.log(app.SumTable.totalCalories);
    //console.log(app.SumTable.date);
    var addedView;
    var n = _.findLastIndex(app.SumTable.models);
    addedView = new app.AddedView({
      model: app.SumTable.models[n]
    });
    $(".added-items-list").append(addedView.render().el);
    console.log(addedView);
  }

});


$(function() {
  new app.AppView();
});

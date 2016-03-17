var app = app || {};

//_.extend(app, Backbone.Events);

app.AppView = Backbone.View.extend({

  el: ".calorie-app",

  sumTemplate: _.template($('.sum-template').html()),

  events: {
    "click .submit-button": "doSearch",
    "keypress .search-input" : "searchOnEnter"
    },

  initialize: function() {

   app.GlobalEvents = _.extend({}, Backbone.Events);

  $('#datepicker').datepicker({onSelect: function(dateStr) {
      app.GlobalEvents.trigger('dateChange');
    }});

    this.listenTo(app.GlobalEvents, 'dateChange', this.renderDayTable);


    this.listenTo(app.SumTable, 'add', this.addToTable);

    this.listenTo(app.SumTable, 'add', this.renderTotalCal);
    this.listenTo(app.SumTable, 'remove', this.renderTotalCal);

  },

  renderDayTable: function() {
    app.GlobalEvents.trigger('removePrevViews');

    var addedView;
    var filteredByDate = app.SumTable.filterByDate();
    $(".added-items-list").html("");

  _.each(filteredByDate, function(model){
      addedView = new app.AddedView({
        model: model
      });
      $(".added-items-list").append(addedView.render().el);
    });

    this.renderTotalCal();

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
        console.log(response);
      }.bind(this),
      error: function(errorResponse) {
        console.log(errorResponse)
      }
    });
  },

  renderTotalCal: function() {
  var totalCalories = 0;

  var filteredByDate = app.SumTable.filterByDate();

  _.each(filteredByDate, function(model) {
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

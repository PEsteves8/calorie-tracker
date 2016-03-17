var app = app || {};

//_.extend(app, Backbone.Events);

app.AppView = Backbone.View.extend({

  el: ".calorie-app",

  sumTemplate: _.template($('.sum-template').html()),

  events: {
    "click .submit-button": "doSearch",
    "keypress .search-input": "searchOnEnter"
  },




  initialize: function() {

    app.GlobalEvents = _.extend({}, Backbone.Events);

    this.listenTo(app.GlobalEvents, 'dateChange', this.renderDayTable);

    this.listenTo(app.SearchResults, 'add', this.renderSearch);

    this.listenTo(app.SumTable, 'sync', this.renderDayTable);
    this.listenTo(app.SumTable, 'add', this.addToTable);

    this.listenTo(app.SumTable, 'add remove', this.renderTotalCal);
    this.listenTo(app.SumTable, 'add remove', this.refreshDatePicker);

    app.SumTable.fetch({
      silent: true
    }); /*Silent true so that it doesn't fire add events. That is bound to addToTable which doesn't filter by date. Since sync events always get triggered the actual filtered rendering of current items is triggerd by 'sync' */
//@TODO Fix first render not showing unless date change
    $('#datepicker').datepicker({
      onSelect: function(dateStr) {
        app.GlobalEvents.trigger('dateChange');
      },
      beforeShowDay: function(date) {

        var dates = [];
        app.SumTable.each(function(model) {
          if (dates.indexOf(model.get('date')) === -1) {
            dates[model.get('date')] = model.get('date');
          }
        })
        var dd = String(date.getDate());
        if (dd.length === 1) {
          dd = "0" + dd;
        }
        var mm = String(date.getMonth() + 1); //January is 0!
        if (mm.length === 1) {
          mm = "0" + mm;
        }
        var yyyy = date.getFullYear();
        var shortDate = yyyy + '-' + mm + '-' + dd;

        if (shortDate == dates[shortDate]) {
          return [true, "Highlighted", ""];
        } else {
          return [true, '', ''];
        }
      }

    });

  },

  refreshDatePicker: function() {
    $("#datepicker").datepicker("refresh");
  },

  renderDayTable: function() {
    app.GlobalEvents.trigger('removePrevViews');

    var addedView;
    var filteredByDate = app.SumTable.filterByDate();
    $(".added-items-list").html("");

    _.each(filteredByDate, function(model) {
      addedView = new app.AddedView({
        model: model
      });
      $(".added-items-list").append(addedView.render().el);
    });

    this.renderTotalCal();

  },

  searchOnEnter: function(e) {
    if (e.which === 13) {
      this.doSearch();
    }
  },

  doSearch: function() {
    app.SearchResults.foodName = $(".search-input").val().trim();
    app.SearchResults.fetch({
      success: function(response, xhr) {
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
      return;
    }

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

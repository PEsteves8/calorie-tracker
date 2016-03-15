var app = app || {};


var SearchResultsList = Backbone.Collection.extend({

  model: app.SearchItem,

  foodName: "cookies",

  url: function() {
    return "https://api.nutritionix.com/v1_1/search/" + this.foodName + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=2d9c91e7&appKey=4e8a963034f86954a7c5cf54a7c5c89a";
  },

  parse: function(response) {
    return response.hits;
  },

  comparator: 'name'

});

app.SearchResults = new SearchResultsList();

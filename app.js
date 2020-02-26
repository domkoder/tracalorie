// Storage Controller

// Item Controller
const ItemController = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Cookie', calories: 200 },
      { id: 2, name: 'Eggs', calories: 700 },
      { id: 3, name: 'Fish', calories: 900 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UIController = (function() {
  // Public method
  return {};
})();

// App Controller
const App = (function(ItemController, UIController) {
  // Public method
  return {
    init: function() {
      console.log('Initializing App....');
    }
  };
})(ItemController, UIController);

// Initialize App
App.init();

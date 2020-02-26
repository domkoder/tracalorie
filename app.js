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
    getItems: function() {
      return data.items;
    },

    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UIController = (function() {
  const UISelectors = {
    itemList: 'item-list'
  };

  // Public method
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}"> ${item.name}:
            <strong>
              <em>${item.calories} Calories</em>
              <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </strong>
          </li>`;
      });
      // Insert list items
      document.getElementById(UISelectors.itemList).innerHTML = html;
    }
  };
})();

// App Controller
const App = (function(ItemController, UIController) {
  // Public method
  return {
    init: function() {
      // Fetch Items from data structure
      const items = ItemController.getItems();

      // Populate list with items
      UIController.populateItemList(items);
    }
  };
})(ItemController, UIController);

// Initialize App
App.init();

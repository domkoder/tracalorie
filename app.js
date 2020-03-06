/*#################################################
=> Storage Controller
#################################################*/

/*#################################################
=> Item Controller
#################################################*/
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
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: 'Cookie', calories: 200 },
      // { id: 2, name: 'Eggs', calories: 700 },
      // { id: 3, name: 'Fish', calories: 900 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: () => data.items,
    addItem: (name, calories) => {
      let id;
      // Create id
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 1;
      }
      // Calories to number
      calories = parseInt(calories);
      // Create and return new item
      newItem = new Item(id, name, calories);
      data.items.push(newItem);
      return newItem;
    },
    getTotalCalories: () => {
      let total = 0;
      // Loop through items and total amount of calories
      data.items.forEach(item => (total += item.calories));
      // Set total calories in data Structure and return it
      return (data.totalCalories = total);
    },
    getItemById: id => {
      let found = null;
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: (name, calories) => {
      // Calories to number
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: id => {
      // Get ids
      const ids = data.items.map(item => item.id);
      // Get index
      const index = ids.indexOf(id);
      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: () => (data.items = []),
    setCurrentItem: item => (data.currentItem = item),
    getCurrentItem: () => data.currentItem,
    logData: () => data
  };
})();

/*#################################################
=> UI Controller
#################################################*/
const UIController = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    cardTitle: '.card-title'
  };
  // Public method
  return {
    populateItemList: items => {
      let html = '';
      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li`;
      });
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: item => {
      // Shoe the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add id
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
      // Inert item
      document.querySelector(UISelectors.itemList).appendChild(li);
      // document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: item => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // convert Node list to array
      listItems = Array.from(listItems);
      listItems.forEach(listItem => {
        const itemId = listItem.getAttribute('id');
        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
          `;
        }
      });
    },
    deleteListItem: id => {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories;
      UIController.editState();
    },
    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Convert NOde to array
      listItems = Array.from(listItems);
      listItems.forEach(item => {
        item.remove();
      });
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: totalCalories => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    editState: () => {
      document.querySelector(UISelectors.cardTitle).textContent = 'Edit Meal / Food Item';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    initState: () => {
      UIController.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    getSelectors: () => UISelectors
  };
})();

/*#################################################
=> App Controller
#################################################*/
const App = (function(ItemController, UIController) {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI Selectors
    const UISelectors = UIController.getSelectors();
    // Disable submit on enter
    document.addEventListener('keypress', event => {
      if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
      }
    });
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    // Edit item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UIController.initState);
    // Delete item event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };
  // Add item submit
  const itemAddSubmit = event => {
    // Get form input from UI Controller
    const input = UIController.getItemInput();
    // Check for input UI calorie input
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemController.addItem(input.name, input.calories);
      // Add item to UI list
      UIController.addListItem(newItem);
      // Get total calories
      const totalCalories = ItemController.getTotalCalories();
      // Add total calories to the UI
      UIController.showTotalCalories(totalCalories);
      // Clear fields
      UIController.clearInput();
    }
    event.preventDefault();
  };

  // Click edit
  const itemEditClick = event => {
    if (event.target.classList.contains('edit-item')) {
      // Get the list item id
      const listId = event.target.parentNode.parentNode.id;
      // Break into an array
      const listIdArr = listId.split('-');
      // Get the actual id
      const id = parseInt(listIdArr[1]);
      // Get item
      const itemToEdit = ItemController.getItemById(id);
      // Set current item
      ItemController.setCurrentItem(itemToEdit);
      // Add item to form
      UIController.addItemToForm();
    }
    event.preventDefault();
  };

  // Edit item submit
  const itemUpdateSubmit = event => {
    // Get item input
    const input = UIController.getItemInput();
    // Update item
    const updatedItem = ItemController.updateItem(input.name, input.calories);
    // Update UI
    UIController.updateListItem(updatedItem);
    // Get total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to the UI
    UIController.showTotalCalories(totalCalories);
    UIController.initState();
    event.preventDefault();
  };

  // Delete button event
  const itemDeleteSubmit = event => {
    //Get current item
    const currentItem = ItemController.getCurrentItem();
    // Delete from data structure
    ItemController.deleteItem(currentItem.id);
    // Remove item from UI
    UIController.deleteListItem(currentItem.id);
    // Get total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to the UI
    UIController.showTotalCalories(totalCalories);
    // Clear fields
    UIController.initState();
    event.preventDefault();
  };

  const clearAllItemsClick = () => {
    // Delete all items from data structure
    ItemController.clearAllItems();
    // Get total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to the UI
    UIController.showTotalCalories(totalCalories);
    // Remove from UI
    UIController.removeItems();
  };

  // Public method
  return {
    init: () => {
      // Set initial state
      UIController.initState();
      // Fetch Items from data structure
      const items = ItemController.getItems();
      // Check if there is any item in the items list
      if (items.length === 0) {
        UIController.hideList();
      } else {
        // Populate list with items
        UIController.populateItemList(items);
      }
      // Get total calories
      const totalCalories = ItemController.getTotalCalories();
      // Add total calories to the UI
      UIController.showTotalCalories(totalCalories);
      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemController, UIController);

// Initialize App
App.init();

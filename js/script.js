"use strict";

const itemInput = document.getElementById("itemInput");
const categorySelector = document.getElementById("categorySelector");
const addItemButton = document.getElementById("addButton");

addItemButton.addEventListener("click", addItem);

const shoppingList = document.getElementById("shoppingList");
const filterOptions = document.querySelectorAll("input[name='filter']");
filterOptions.forEach((option) =>
  option.addEventListener("change", updateListDisplay)
);

let items = [];

function addItem() {
  const itemName = itemInput.value.trim();
  const category = categorySelector.value;

  if (itemName === "") {
    alert("Please enter an item name!");
    return;
  }

  items.push({ name: itemName, category, completed: false });
  itemInput.value = "";
  updateListDisplay();
}

function getFilteredItems(filterValue) {
  return items.filter(function (item) {
    if (filterValue == "all") {
      return true;
    }
    if (filterValue == "bought") {
      return item.completed;
    }
    if (filterValue == "not-bought") {
      return item.completed == false;
    }
  });
}

function updateListDisplay() {
  shoppingList.innerHTML = "";
  const filterValue = document.querySelector(
    "input[name='filter']:checked"
  ).value;

  const filteredItems = getFilteredItems(filterValue);

  filteredItems.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.name}</span>
      <span class="category">[${item.category}]</span>
              <button onclick="switchStatus(${index})">
          ${item.completed ? "Unmark" : "Mark as Bought"}
        </button>
      <button onclick="deleteItem(${index})">Delete2</button>

    `;

    shoppingList.appendChild(li);
  });
}

function deleteItem(index) {
  items.splice(index, 1);
  updateListDisplay();
}

// added this function to switch the status of a task between "bought" and "not bought"
// we call it inside the inner html of the li
function switchStatus(index) {
  items[index].completed = !items[index].completed;
  updateListDisplay();
}

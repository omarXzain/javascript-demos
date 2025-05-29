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

// getting the items
getLocalStorage();

function addItem() {
  const itemName = itemInput.value.trim();
  const category = categorySelector.value;

  if (itemName === "") {
    alert("Please enter an item name!");
    return;
  }

  items.push({ name: itemName, category, completed: false });
  itemInput.value = "";
  console.log("items test", items);
  setLocalStorage();
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
      <button onclick="deleteItem(${index})">Delete</button>
    `;

    shoppingList.appendChild(li);
  });
}

function deleteItem(index) {
  items.splice(index, 1);
  setLocalStorage();
  updateListDisplay();
}

function setLocalStorage() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

function getLocalStorage() {
  const shopList = localStorage.getItem("shoppingList");

  if (shopList) {
    items = JSON.parse(shopList);
    updateListDisplay();
  }
}

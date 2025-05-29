"use strict";

// without constructur
// const Coffee = {
//   name: "Latte",
//   size: "Small",
//   price: 1.5,
// };

// const Coffee2 = {
//   name: "Espresso",
//   size: "Big",
//   price: 3.5,
// };

// console.log(Coffee, Coffee2);

// constructor
function Coffee(name, size, price) {
  this.name = name;
  this.size = size;
  this.price = price;

  this.description = function () {
    return `${this.name} ${this.size} ${this.price}`;
  };
}

// const Coffe1 = new Coffee("Latte", "Small", 1.5);
// const Coffe2 = new Coffee("Espresso", "Big", 3.5);

// console.log(Coffe1.description());

const form = document.getElementById("CoffeeForm");
const orderList = document.getElementById("orderlist");

const ordersArr = [];

// form listner
form.addEventListener(
  "submit",

  function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const size = document.getElementById("size").value;
    const price = document.getElementById("price").value;

    const newOrder = new Coffee(name, size, price);

    ordersArr.push(newOrder);

    renderData();
  }
);

function renderData() {
  ordersArr.forEach((orders) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `${orders.name} ${orders.size} ${orders.price} `;
    orderList.appendChild(listItem);
  });
}

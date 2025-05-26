const cardContainer = document.getElementById("cardContainer");

async function fetchData() {
  try {
    const fetchData = await fetch("https://fakestoreapi.com/products");
    const afterFetching = await fetchData.json();

    renderData(afterFetching);
  } catch (error) {
    console.log("error happened", error);
  }
}

function boilWater() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Water is boiled");
    }, 3000);
  });
}

function addCoffee() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("coffee is added");
    }, 1000);
  });
}

function serveCoffee() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("coffe is served ");
    }, 6000);
  });
}

// Async / Await Method
async function makeCoffe() {
  try {
    console.log("Preparation started");

    const boiledwater = await boilWater();
    console.log(boiledwater);

    const addCoffeevalue = await addCoffee();
    console.log(addCoffeevalue);

    const serveCoffeeValue = await serveCoffee();
    console.log(serveCoffeeValue);
  } catch (error) {
    console.log(error);
  }
}

makeCoffe();

// .then Method
// boilWater()
//   .then((boiled) => {
//     console.log(boiled);
//     return addCoffee();
//   })
//   .then((coffeAdded) => {
//     console.log(coffeAdded);
//     return serveCoffee();
//   })

//   .then((servingCoffe) => {
//     console.log(servingCoffe);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// render function
function renderData(procuctX) {
  procuctX.forEach((element) => {
    // 1- create elemnt
    const card = document.createElement("div");
    card.className = "card";

    // 2- insert the data using innerHTML
    card.innerHTML = `
<img src="${element.image}">

<div class="card-content"> 
<p> ${element.title}</p>
<p> ${element.price}</p>
<p> ${element.category}</p>
<p> ${element.rating.rate}</p>
</div>

`;

    // 3- append the elemnt using the parent elemnent
    cardContainer.appendChild(card);
  });
}

fetchData();

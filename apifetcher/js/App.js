const cardContainer = document.getElementById("cardContainer");

function fetchData() {
  // step 1
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("the response status is not ok");
      }
      //step 2
      return response.json();
    })
    .then((products) => {
      console.log("Checking what is inside products", products);
      // step 3 we need to complete it later
      renderData(products);
    })
    .catch((error) => {
      console.log("error catched here", error);
      cardContainer.innerHTML = "<p> error happened in the catch method </p>";
    });
}

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
renderData;

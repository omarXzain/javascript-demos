const CoffeePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random() > 0.5;

    if (random) {
      resolve("your coffee is ready");
    } else {
      reject("the machine is broken");
    }
  }, 3000);
});

console.log("Preparing your coffee");

CoffeePromise.then((result) => {
  console.log(result);
}).catch((error) => {
  console.error("rejected:", error);
});

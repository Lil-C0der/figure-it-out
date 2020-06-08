const myPromise = require("./promise");

console.log(1);
new myPromise((resolve, reject) => {
  //   throw new Error("error!!");
  setTimeout(() => {
    console.log(2);
    resolve(1);
  });
}).then(
  (value) => {
    console.log(4);
    console.log("value " + value);
  },
  (reason) => {
    console.log("reason " + reason);
  }
);

console.log(3);

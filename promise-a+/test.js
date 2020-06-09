const MyPromise = require("./promise");
const HisPromise = require("./temp");

console.log(1);
// new MyPromise((resolve, reject) => {
//   throw new Error("error!!");
// })
//   .then(
//     (value) => {
//       return "promise1 value " + value;
//     },
//     (reason) => {
//       return "promise1 reason " + reason;
//     }
//   )
//   .then(
//     (value) => {
//       console.log("promise2 value " + value);
//     },
//     (reason) => {
//       console.log("promise2 reason " + reason);
//     }
//   );

let p = new Promise((resolve, reject) => {
  // resolve("hello");
  reject("hello");
});
p.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    throw reason;
  }
).then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log("reason " + reason);
  }
);
console.log(3);

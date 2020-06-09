// 原生 Promise

console.log(1);
// new Promise((resolve, reject) => {
//   throw new Error("error!!");
// })
//   .then(
//     (value) => {
//       // throw new Error("failed");
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

let fs = require("fs");

let p1 = new Promise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    reject(4);
  });
});
p1.then(
  (data) => {
    console.log(data);
  },
  (reason) => {
    console.log("reason " + reason);
  }
);
p1.then(
  (data) => {
    console.log(data);
  },
  (reason) => {
    console.log("reason " + reason);
  }
);
p1.then(
  (data) => {
    console.log(data);
  },
  (reason) => {
    console.log("reason " + reason);
  }
);
console.log(3);

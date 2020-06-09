const MyPromise = require("./promise");
const HisPromise = require("./temp");

console.log(1);
// new MyPromise((resolve, reject) => {
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

let p1 = new MyPromise((resolve, reject) => {
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

// var p2 = new HisPromise((resolve, reject) => {
//   console.log(2);
//   resolve(p2);
// }).then((data) => {
//   console.log(data);
// });

console.log(3);

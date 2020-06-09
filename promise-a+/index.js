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

let p = new Promise((resolve, reject) => {
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

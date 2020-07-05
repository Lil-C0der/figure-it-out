// 实现一个累加器
let add = function (...args) {
  const sum = function (...newArgs) {
    args.push(...newArgs);
    return sum;
  };
  // return 函数 sum 时会自动调用 toString 方法
  sum.toString = () => {
    return args.reduce((pre, cur) => pre + cur, 0);
  };

  // 调用 valueOf 方法返回 Number 类型
  sum.valueOf = () => {
    return new Number(args.reduce((pre, cur) => pre + cur, 0)).valueOf();
  };

  return sum;
};
console.log("累加", add(1)(2)(3));
console.log("累加", add(1, 2)(3)(4));
console.log("累加", add(1, 2)(3)(4) + 10);

let res = add(1)(2, 3).valueOf();
// 6 number
console.log("累加器", res, typeof res);

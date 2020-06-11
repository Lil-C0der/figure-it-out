// 实现 call 方法
// !!! 注意：...args 在这里的作用是把所有参数合并成一个数组
Function.prototype.myCall = function (context, ...args) {
  // 如果传入的上下文对象为 null 或 undefined 则替换为全局对象，直接调用函数即可指向全局对象
  if (!context) return this(...args);
  // 给上下文对象 context 添加方法，这里的 this 指向的就是这个方法，因为通过 func.myCall 调用
  context._tempFn = this;
  // 展开参数 args，调用方法
  const result = context._tempFn(...args);
  // 删除这个临时的方法
  delete context._tempFn;
  return result;
};

// 测试用
// a = "globalA";
// b = "globalB";

// function test(arg1, arg2) {
//   console.log(this.a, this.b);
//   console.log(arg1, arg2);
// }

// const obj = { a: "a", b: "b" };
// test(1, 2); // globalA globalB; 1 2;
// test.call(obj, 1, 2); // a b; 1 2;
// test.myCall(obj, 1, 2); //a b; 1 2;

// 实现 apply 方法
// !!! 注意：这里的 args 就是一个数组
Function.prototype.myApply = function (context, args) {
  // 如果传入的上下文对象为 null 或 undefined 则替换为全局对象，直接调用函数即可指向全局对象
  if (!context) return this(args);
  // 给上下文对象 context 添加方法，这里的 this 指向的就是这个方法，因为通过 func.myCall 调用
  context._tempFn = this;
  // 展开参数 args，调用方法
  const result = context._tempFn(...args);
  // 删除这个临时的方法
  delete context._tempFn;
  return result;
};

// 测试用
// let array = ["a", "b"];
// let elements = [0, 1, 2];
// array.push.myApply(array, elements);
// console.info(array); // ["a", "b", 0, 1, 2]

// 实现 bind 方法
Function.prototype.myBind = function (context, ...args) {
  let _tempFn = this;
  const boundFunc = function (...newArgs) {
    if (new.target) {
      // 如果通过 new 运算符被调用，应该将 this 指向返回的函数，即新的构造函数
      return _tempFn.call(this, ...args, ...newArgs);
    } else {
      return _tempFn.call(context, ...args, ...newArgs);
    }
  };
  // 处理原型链
  boundFunc.prototype = Object.create(_tempFn.prototype);
  boundFunc.prototype.constructor = boundFunc;
  // 修改新函数的 name 和 length 属性
  Object.defineProperties(boundFunc, {
    name: {
      value: `bound ${this.name}`,
      writable: false,
      enumerable: false,
      configurable: true,
    },
    length: {
      value: _tempFn.length,
      writable: false,
      enumerable: false,
      configurable: true,
    },
  });
  return boundFunc;
};

// 测试用
// function list() {
//   return Array.prototype.slice.call(arguments);
// }
// let leadingThirtysevenList = list.myBind(null, 37);
// console.log(leadingThirtysevenList(1, 2, 3)); // [37, 1, 2, 3]

// function Point(x, y) {
//   this.x = x;
//   this.y = y;
// }
// Point.prototype.toString = function () {
//   return this.x + "," + this.y;
// };

// let YAxisPoint0 = Point.bind(null, 0 /*x*/);
// let YAxisPoint = Point.myBind(null, 0 /*x*/);

// let axisPoint = new YAxisPoint(5);
// console.log(axisPoint.toString()); // '0,5'
// console.log(axisPoint instanceof Point); // true
// console.log(axisPoint instanceof YAxisPoint); // true
// console.log(new YAxisPoint(17, 42) instanceof Point); // true

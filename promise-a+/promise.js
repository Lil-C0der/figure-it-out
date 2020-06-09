class MyPromise {
  // 状态常量
  static states = Object.freeze({
    PENDING: "pending",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
  });

  /**
   * Promise 构造器，接受一个函数作为参数，这个函数会传递两个函数参数：resolve 和 reject
   * @param {(resolve: (value) => any, reject: (reason) => any) => any} executor
   */
  constructor(executor) {
    // executor 必须为一个函数
    if (typeof executor !== "function") {
      throw new TypeError(`Promise resolver ${executor} is not a function`);
    }
    this.initPromise();
    // resolve 方法，成功后的操作，改变状态 执行回调
    const resolve = (value) => {
      if (this.state === MyPromise.states.PENDING) {
        // 改变状态 赋值
        this.state = MyPromise.states.FULFILLED;
        this.value = value;
        // 执行队列中的回调函数
        this.onFulfilledCallbacks.forEach((cb) => {
          // 实参 this.value
          cb(this.value);
        });
      }
    };
    // reject 方法，失败后的操作，改变状态 执行回调
    const reject = (reason) => {
      if (this.state === MyPromise.states.PENDING) {
        this.state = MyPromise.states.REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => {
          cb(this.reason);
        });
      }
    };

    // executor 中的代码是同步代码，立刻执行
    try {
      executor(resolve, reject);
    } catch (e) {
      // 如果有异常，调用 reject 方法，抛出异常
      reject(e);
    }
  }

  // 初始化 Promise 的 state value 和 reason
  initPromise = () => {
    this.state = MyPromise.states.PENDING;
    this.value = null;
    this.reason = null;
    // executer 中 resolve 后执行的回调
    this.onFulfilledCallbacks = [];
    // executor 中 reject 时或者抛出错误时执行的回调
    this.onRejectedCallbacks = [];

    this.onFulfilledCallbacks.push((value) => {
      // 默认的回调也要检查是否循环链，例如：
      // const p = new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //         resolve(p);
      //     })
      // })
      if (value === this) {
        console.warn("Chaining cycle detected for promise #<Promise>");
      }
    });

    this.onRejectedCallbacks.push((reason) => {
      if (reason === this) {
        console.warn("Chaining cycle detected for promise #<Promise>");
        return;
      }
    });
  };

  /**
   * then 方法
   * @param {function} onFulfilled 在 executor 中调用 resolve(value) 后的回调
   * @param {function} onRejected 在 executor 中调用 reject(error) 或者抛出异常时的回调
   */
  then = (onFulfilled, onRejected) => {
    // onFulfilled/onRejected 不为函数时，继续传递 value/reason 确保下一个 then 能拿到参数
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }

    // 因为 then 中抛出异常会使 Promise 状态从 fulfilled 变为 rejected
    // 但是规范中规定：Promise 状态一旦发生改变不能变化，所以应该返回一个新的实例来实现链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      // resolve/reject 被同步调用后，状态变为 fulfilled/rejected
      if (this.state === MyPromise.states.FULFILLED) {
        // 用 setTimeout 模拟微任务
        setTimeout(() => {
          // 不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected
          try {
            const x = onFulfilled(this.value);
            // TODO 如果 x 又是一个 Promise 呢?
            MyPromise.resolvePromise(this, promise2, x, resolve, reject);
          } catch (e) {
            // promise2 的拒因
            reject(e);
          }
        });
      }
      if (this.state === MyPromise.states.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            MyPromise.resolvePromise(this, promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      // 处理 resolve/reject 被异步调用的情况，将回调函数 push 到队列中
      if (this.state === MyPromise.states.PENDING) {
        // 形参 value，实参为 resolve 方法调用时传入的 this.value
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value);
              MyPromise.resolvePromise(this, promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason);
              MyPromise.resolvePromise(this, promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  };

  /**
   * 处理 then 回调函数的返回值，根据 x 来判断 promise2 的状态
   * @param {Promise} self 调用 then 函数的那个 promise
   * @param {Promise} promise2 新返回的 promise
   * @param {any} x then 返回值
   */
  static resolvePromise(self, promise2, x, resolve, reject) {
    // 如果返回值是 promise2 抛出类型错误
    if (x === promise2) {
      return reject(
        new TypeError("Chaining cycle detected for promise #<Promise>")
      );
    }
    // 如果 x 是对象或函数
    if ((typeof x === "object" && x !== null) || typeof x === "function") {
      let then;
      // 是否已经调用了 resolvePromise/rejectPromise
      let called = false;

      try {
        then = x.then;
      } catch (e) {
        // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise2
        reject(e);
      }
      if (typeof then === "function") {
        // 执行成功的回调 继续传递 value
        const resolvePromise = (y) => {
          // 如果 resolvePromise/rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
          if (called) return;
          called = true;
          // y 可能还是一个 Promise，所以递归调用 resolvePromise
          // 直到最后返回一个普通值，调用 resolve 方法
          MyPromise.resolvePromise(self, promise2, y, resolve, reject);
        };

        // 执行失败的回调 继续传递 reason
        const rejectPromise = (r) => {
          if (called) return;
          called = true;
          reject(r);
        };
        // call 可以避免再次用 x.then 取值
        then.call(x, resolvePromise, rejectPromise);
      } else {
        // 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x);
      }
    } else {
      // x 是一个普通值，让 promise2 成功即可
      resolve(x);
    }
  }
}

module.exports = MyPromise;

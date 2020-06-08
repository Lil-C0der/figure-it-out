class myPromise {
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
    // 在 onRejected 中抛出异常
    try {
      // executor 中的代码是同步代码
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  // 初始化 Promise 的 state value 和 reason
  initPromise = () => {
    this.state = myPromise.states.PENDING;
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

  // resolve 方法 成功后的操作，改变状态 执行回调
  resolve = (value) => {
    if (this.state === myPromise.states.PENDING) {
      // 改变状态 赋值
      this.state = myPromise.states.FULFILLED;
      this.value = value;
      // 执行队列中的回调函数
      this.onFulfilledCallbacks.forEach((cb) => {
        // 实参 this.value
        cb(this.value);
      });
    }
  };
  // reject 方法 失败后的操作，改变状态 执行回调
  reject = (reason) => {
    if (this.state === myPromise.states.PENDING) {
      this.state = myPromise.states.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((cb) => {
        cb(this.reason);
      });
    }
  };

  /**
   * then 方法
   * @param {function} onFulfilled 在 executor 中调用 resolve(value) 后的回调
   * @param {function} onRejected 在 executor 中调用 reject(error) 或者抛出异常时的回调
   */
  then = (onFulfilled, onRejected) => {
    // onFulfilled 不为函数时，继续传递 value 确保下一个 then 能拿到参数
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }
    // resolve 被调用后，状态变为 Fulfilled
    if (this.state === myPromise.states.FULFILLED) {
      // 用 setTimeout 模拟微任务
      setTimeout(() => {
        onFulfilled(this.value);
      });
    }
    if (this.state === myPromise.states.REJECTED) {
      setTimeout(() => {
        onRejected(this.reason);
      });
    }
    // 处理 resolve 被异步调用的情况，将回调函数 push 到队列中
    if (this.state === myPromise.states.PENDING) {
      // 形参 value，实参为 resolve 方法调用时传入的 this.value
      this.onFulfilledCallbacks.push((value) => {
        setTimeout(() => {
          onFulfilled(value);
        });
      });

      this.onRejectedCallbacks.push((reason) => {
        setTimeout(() => {
          onRejected(reason);
        });
      });
    }
    // TODO then 方法的链式调用
  };
}

module.exports = myPromise;

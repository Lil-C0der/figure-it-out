class EventEmitter {
  constructor() {
    this.handler = {};
  }

  // event 作为对象 key 值，表示事件名，对象属性值为一个二维数组，表示对应的回调函数和函数类型
  // type = 1 表示不是 once
  on(event, func, type = 1) {
    if (!this.handler[event]) {
      this.handler[event] = [];
    }
    this.handler[event].push([func, type]);
  }

  // 只触发一次，type = 0
  once(event, func, type = 0) {
    this.on(event, func, type);
  }

  emit(event, ...args) {
    // 寻找对应事件的回调函数
    let fns = this.handler[event];
    if (!fns || fns.length === 0) return;
    fns.forEach((fn, index) => {
      // fn 为 handler 和 type 组成的数组
      fn[0].apply(this, args);
      // once 只触发一次
      if (fn[1] === 0) {
        fns.splice(index, 1);
      }
    });
  }

  // 移除监听，fn 为已经注册的监听器
  off(event, func) {
    let fns = this.handler[event];
    fns.forEach((fn, index) => {
      if (fn === func) {
        fns.splice(index, 1);
      }
    });
  }
}

let bus = new EventEmitter();
bus.on("click", (value) => {
  console.log(value);
});
bus.emit("click", 111);

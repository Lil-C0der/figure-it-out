class Scheduler {
  constructor(max) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }
  add(promiseCreator) {
    let res = null;
    const p = new Promise((resolve) => {
      res = resolve;
    });

    this.queue.push({ promiseCreator, res });
    this.next();
    return p;
  }

  next() {
    while (this.queue.length && this.count < this.max) {
      const { promiseCreator, res } = this.queue.shift();
      promiseCreator().then((val) => {
        this.count--;
        // 在 then 方法里面 resolve 之前的 Promise
        res(val);
        // 继续取下一个任务运行
        this.next();
      });

      this.count++;
    }
  }
}

/* ---------------- 题目 ---------------- */

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

// 2 3 1 4
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

class _LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    let task = () => {
      console.log(`I am ${name}`);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next = function () {
    let task = this.tasks.shift();
    task && task();
  };

  rest = function (wait) {
    let task = () => {
      setTimeout(() => {
        console.log(`Start learning after ${wait} seconds`);
        this.next();
      }, wait * 1000);
    };
    this.tasks.push(task);
    return this;
  };

  restFirst = function (wait) {
    let task = () => {
      setTimeout(() => {
        console.log(`Start learning after ${wait} seconds`);
        this.next();
      }, wait * 1000);
    };
    this.tasks.unshift(task);
    return this;
  };

  learn = function (skill) {
    let task = () => {
      console.log(`Learning ${skill}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  };
}

function LazyMan(name) {
  return new _LazyMan(name);
}

// LazyMan("Hank");
// LazyMan("jack").rest(3).learn("computer");
LazyMan("jack").rest(2).learn("chinese").rest(2).learn("computer");
// LazyMan("jack").restFirst(5).learn("computer");

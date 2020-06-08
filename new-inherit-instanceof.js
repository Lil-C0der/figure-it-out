// 实现 new
function myNew(constructor, ...args) {
  // TODO 可以加入判断 constructor 类型的工具函数
  // 创建一个原型为 constructor 的 prototype 的空对象 target
  let target = Object.create(constructor.prototype);
  constructor.call(target, ...args);
  return target;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.speak = function () {
  console.log(`${this.name}: blahblahblah...`);
};

let alex = myNew(Person, "Alex", 48);
let bob = new Person("Bob", 50);

// console.log(bob.__proto__ === alex.__proto__); // true
alex.speak(); // Alex: blahblahblah...
bob.speak(); // Bob: blahblahblah...

// 实现继承
function inherit(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  sub.prototype.constructor = sub;
  sub.__proto__ = sup;
}

function Student(name, age, sco) {
  Person.call(this, name, age);
  this.sco = sco;
}
inherit(Student, Person);
Student.prototype.learn = function () {
  console.log(`${this.name}: I am learning`);
};
let david = myNew(Student, "david", 10, 98);
let frank = new Student("frank", 12, 95);

// console.log(david.__proto__ === frank.__proto__); // true
david.speak(); // David: blahblahblah...
david.learn(); // David: I am learning

// 原型链
// 父类实例对象的 __proto__ 指向构造函数的原型对象
console.log(alex.__proto__ === Person.prototype);
// 子类实例对象的 __proto__ 指向子类构造函数的原型对象
console.log(david.__proto__ === Student.prototype);
// 子类构造函数原型对象的 __proto__ 指向父类构造函数的原型对象
console.log(Student.prototype.__proto__ === Person.prototype);
// 父类构造函数原型对象的 __proto__ 指向 Object 的原型对象，因为原型对象是 object
console.log(Person.prototype.__proto__ === Object.prototype);
// 父类构造函数的 __proto__ 指向 Function 的原型对象，因为构造函数是 function
console.log(Person.__proto__ === Function.prototype);
// Function 原型对象的 __proto__ 指向 Object 的原型对象，因为原型对象是 object
console.log(Function.prototype.__proto__ === Object.prototype);
// Object 原型对象的 __proto__ 指向 null，这是原型链的终点
console.log(Object.prototype.__proto__ === null);

// instanceof
// 迭代
console.log("实现 instanceof");
function myInstanceof(instance, constructor) {
  let proto = instance.__proto__;
  let prototype = constructor.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}

console.log(myInstanceof(david, Student)); // true
// 传入子类实例和父类构造函数
console.log(myInstanceof(david, Person)); // true

// 非迭代
function myInstanceof2(instance, constructor) {
  // TODO 可以加入判断 constructor 类型的工具函数
  return constructor.prototype.isPrototypeOf(instance);
}
console.log(myInstanceof2(david, Person)); // true

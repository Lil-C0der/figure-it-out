function deepClone(source, hash = new WeakMap()) {
  // 查表，如果表中有则返回
  if (hash.has(source)) return hash.get(source);
  // 判断复制的目标是数组还是对象
  const target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  // 遍历对象 拷贝每一个值
  for (let key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      // 如果值是对象则递归调用
      target[key] = deepClone(source[key], hash);
    } else {
      // 直接赋值
      target[key] = source[key];
    }
  }

  return target;
}

let obj = {
  b: "aaa",
  c: null,
  d: {
    d1: "d1",
    d2: "d2",
  },
};
obj.a = obj;

let newObj = deepClone(obj);

newObj.b = "bbb";
newObj.c = "c";
newObj.d.d1 = "D1";

obj.b = "bb";

console.log(obj); // { b: 'bb', c: null, d: { d1: 'd1', d2: 'd2' }, a: [Circular] }
console.log(newObj); // { b: 'bbb', c: 'c', d: { d1: 'D1', d2: 'd2' }, a: [Circular] }

let arr = [1, 2, 3, 4, 5, [2, 3]];
let newArr = deepClone(arr);
newArr[0] = 0;
arr[1] = { a: 1, b: 2 };

console.log(newArr);
console.log(arr);

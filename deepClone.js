function deepClone(source, hash = new WeakMap()) {
  // 查表，如果表中有则返回
  if (hash.has(source)) return hash.get(source);
  // 判断复制的目标是数组还是对象
  const targetObj = source.constructor === Array ? [] : {};
  hash.set(source, targetObj);
  // 遍历对象 拷贝每一个值
  for (let keys in source) {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      // 如果值是对象则递归
      targetObj[keys] = deepClone(source[keys], hash);
    } else {
      // 直接赋值
      targetObj[keys] = source[keys];
    }
  }
  return targetObj;
}

let obj = {
  b: "aaa",
  c: null,
};
obj.a = obj;

let newObj = deepClone(obj);
newObj.b = "ccc";
console.log(newObj);
console.log(obj);

let arr = [1, 2, 3, 4, 5, [2, 3]];
let newArr = deepClone(arr);
newArr[0] = 0;
console.log(newArr);
console.log(arr);

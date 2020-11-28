/**
 *415. 字符串相加
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
 * 模拟各个数位的加法、进位
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function addString(num1, num2) {
  let arr1 = num1.split('');
  let arr2 = num2.split('');
  let res = '';
  // 进位
  let over = 0;
  // 从数组中 pop 各个位的数字，相加，处理进位
  while (arr1.length || arr2.length) {
    let pop1 = arr1.pop();
    let pop2 = arr2.pop();
    let a = pop1 ? +pop1 : 0;
    let b = pop2 ? +pop2 : 0;
    // 每一位的数字 = 数字a + 数字b + 进位over
    // 为了处理进位，还需要模 10
    res = ((a + b + over) % 10) + '' + res;
    // 如果有进位，则 over = 1，否则 over = 0
    over = a + b + over >= 10 ? 1 : 0;
  }
  // 处理相加后结果比参数数位更多的情况，如 99 + 1
  return over ? over + '' + res : res;
}
// console.log(addString('12', '1'));
// console.log(addString('102', '9'));
// console.log(addString('99', '9'));

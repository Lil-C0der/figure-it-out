/**
 * 剑指 Offer 17. 打印从1到最大的n位数
 * 输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。
 * 比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。
 * @param {number} n
 * @return {void}
 */
// 考虑处理大数的情况，用数组来表示一个数字
function printNumbers(n) {
  let limit = Math.pow(10, n);
  // 表示一个数字，数组各元素为数字各个位
  let baseArr = new Array(n).fill(0);
  for (let i = 1; i < limit; i++) {
    console.log(addOne(baseArr));
  }

  /**
   * 返回参数 baseArr 加 1 后的结果
   * @param {Array<number>} baseArr
   * @return {Array<number>}
   */
  function addOne(baseArr) {
    let p = baseArr.length - 1;
    // 表示进位
    let carry = 1;

    while (p >= 0 && carry > 0) {
      // 需要进位
      if (+baseArr[p] + 1 >= 10) {
        baseArr[p] = 0;
        carry = 1;
      } else {
        baseArr[p] = +baseArr[p] + 1;
        carry = 0;
      }
      p--;
    }
    return baseArr;
  }
}
printNumbers(2);

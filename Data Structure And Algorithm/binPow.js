/**
 * 剑指 Offer 16. 数值的整数次方
 * 快速幂，二分取幂
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function binPow(x, n) {
  // 几种特殊情况，直接返回结果
  if (x === 1 || n === 0) {
    return 1;
  }
  if (x === -1) {
    return n % 2 === 0 ? 1 : -1;
  }
  // n === 1 作为递归的出口，也可以用 n === 0
  if (n === 1) {
    return x;
  }
  // 负数指数
  if (n < 0) {
    return 1 / binPow(x, -n);
  }
  // 偶数次幂可以直接二分
  if (n % 2 === 0) {
    return binPow(x * x, n / 2);
  } else {
    // 奇数次幂
    return binPow(x * x, (n - 1) / 2) * x;
  }
}

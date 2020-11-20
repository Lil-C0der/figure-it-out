/**
 * 剑指 Offer 14- I. 剪绳子
 * 一根长度为 n （n >= 2）的绳子，把绳子剪成整数长度的 m 段（m > 1）
 * 每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少
 * 例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
 * @param {number} n
 * @return {number}
 */
function cuttingRope(n) {
  let dp = [];
  dp[2] = 1;
  for (let i = 0; i <= n; i++) {
    dp[i] = 1 * (i - 1);
    for (let j = 0; j <= i / 2; j++) {
      dp[i] = Math.max(j * dp[i - j], j * (i - j), dp[i]);
    }
  }

  return dp[n];
}
console.log(cuttingRope(10)); // 2 * 3 * 3 = 18

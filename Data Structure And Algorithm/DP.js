/**
 * 剑指 Offer 14- I. 剪绳子
 * 一根长度为 n （n >= 2）的绳子，把绳子剪成整数长度的 m 段（m > 1）
 * 每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少
 * 例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
 * @param {number} n
 * @return {number}
 */
function cuttingRope(n) {
  // dp[n] 表示长度为 n 的绳子切割后的最大乘积
  let dp = [];
  dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    // 当 n >= 3 时，2 * (n - 2) >= 1 * (n - 1)，所以可以先将绳子分为 2 和 n - 2 两段
    dp[i] = 2 * (i - 2);
    // 对 n - 2 这段绳子继续划分，同理从 2 开始
    for (let j = 2; j <= i / 2; j++) {
      // 对于有些长度的绳子（例如2、3）继续划分取 dp[2]、dp[3] 反而会使乘积更小，直接相乘则可以提供更大的长度
      dp[i] = Math.max(j * dp[i - j], j * (i - j), dp[i]);
    }
  }

  return dp[n];
}
// console.log(cuttingRope(10)); // 2 * 3 * 3 = 18

// 另一种解法：dp[n] 表示的意义不同
function cuttingRope2(n) {
  // 当 n <= 3 时，绳子在切割后被分为 1 和 n - 1 两段，此时能够贡献的乘积反而更小
  // 所以不适用 dp[n]
  if (n <= 3) {
    return n - 1;
  }
  // dp[n] 表示长度为 n 的绳子能够提供（贡献）的最大乘积
  let dp = [];
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 3;
  for (let i = 4; i <= n; i++) {
    dp[i] = Number.MIN_SAFE_INTEGER;
    for (let j = 2; j < i; j++) {
      dp[i] = Math.max(dp[i], j * dp[i - j]);
    }
  }

  return dp[n];
}
// console.log(cuttingRope2(10));

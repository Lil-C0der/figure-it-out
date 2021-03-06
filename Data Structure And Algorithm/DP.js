/**
 * 剑指 Offer 10- I. 斐波那契数列
 * @param {number} n
 * @return {number}
 */
function fib(n) {
  let dp = [];
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// console.log(fib(6));

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

/**
 * leetcode 300. 最长上升子序列
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 * 子序列，并非连续子序列；上升，指大于，不包括等于。
 * 对于数组 [0, 1, 0, 3, 2, 3]，其最长的连续子序列是 [0, 1, 2, 3]，并不连续
 * @param {Array<number>} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
  // dp[n] 表示：以 nums[n] 结尾的、最长上升子序列的长度
  // 需要将各元素初始化为 1，表示子序列只包含自身，长度为 1
  let dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    // 在 [0, i] 这个区间内，计算最长的上升子序列的长度
    for (let j = 0; j < i; j++) {
      // 将 nums[i] 添加到 [0, j] 区间内的子序列后，构造出更长的子序列
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }
  console.log(dp);
  return Math.max(...dp);
}
// console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));

/**
 * leetcode 121. 买卖股票的最佳时机
 * 一个数组的第 i 个元素是一支股票第 i 天的价格。
 * 只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算所能获取的最大利润。
 * @param {Array<number>} prices
 * @return {number}
 * 注意：不能在买入股票前卖出股票。
 * 输入: [7,1,5,3,6,4]
 * 输出: 5
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5。
 * 注意利润不能是 7-1 = 6, 因为不能在买入前卖出股票。
 */
function maxProfit(prices) {
  let buyIn = Number.MAX_SAFE_INTEGER;
  let profit = 0;
  for (const price of prices) {
    // 判断合适的买入的价格
    buyIn = Math.min(price, buyIn);
    // 当前价格 - 买入价格为利润，需要判断取较大值
    profit = Math.max(price - buyIn, profit);
  }
  return profit;
}
// console.log(
//   maxProfit([7, 1, 5, 3, 6, 4]),
//   maxProfit([1, 2, 3, 4]),
//   maxProfit([4, 3, 2, 1])
// );

/**
 *
 * leetcode 198. 打家劫舍
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算在不触动警报装置的情况下，能够偷窃到的最高金额。
 * @param {Array<number>} nums
 * @return {number}
 */
function rob(nums) {
  if (!nums.length) {
    return 0;
  }
  // dp[n] 表示前 n 间房能偷窃到的最高金额
  let dp = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    // 对于第 i 间房，可以选择偷或者不偷
    // 如果偷，金额就是前 i - 2 间房的金额 + 这间房的金额；不偷则金额不变，和 i - 1 间房的金额相同
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[nums.length - 1];
}

/**
 * leetcode 62. 不同路径
 * 一个机器人位于一个 m * n 网格的左上角，机器人每次只能向下或者向右移动一步。
 * 如果机器人想要到达网格的右下角，问总共有多少条不同的路径？
 * @param {number} m
 * @param {number} n
 * @return {number}
 * 考虑使用 dp，建立二维数组，dp[i][j] 表示想要到达坐标为 (i, j) 的点，有多少条路径
 * 行和列上所有的元素都为 1：因为坐标为 (0, j) 和 (i, 0) 的点，只有一条路径能够到达
 * 对于其他点，则 dp[i][j] = dp[i - 1][j] + dp[i][j - 1]，因为机器人可以向右走，或者向下走，有两个方向可以到达这个点
 */
function uniquePaths(m, n) {
  let dp = new Array(m);

  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
}

/**
 * leetcode 1143. 最长公共子序列
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。
 * 一个字符串的子序列：由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。
 * 若这两个字符串没有公共子序列，则返回 0。
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 * 两个字符串的 dp，需要建立二维数组
 * dp[i][j]：text1 长度为 i + 1 的子串，和 text2 长度为 j + 1 的子串，公共子序列的长度
 */
function longestCommonSubsequence(text1, text2) {
  const row = text1.length,
    col = text2.length;

  let dp = new Array(row);

  for (let i = 0; i < row; i++) {
    dp[i] = new Array(col).fill(0);
    for (let j = 0; j < col; j++) {
      if (text1[i] === text2[j]) {
        // 当有匹配的字符，且其中一个子串的长度为 1 时，公共子序列的长度只能为 1
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        }
      } else {
        // 没有匹配的字符时
        if (i === 0 && j === 0) {
          dp[i][j] = 0;
        } else if (i === 0) {
          dp[i][j] = dp[i][j - 1];
        } else if (j === 0) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        }
      }
    }
  }
  return dp[row - 1][col - 1];
}

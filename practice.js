function fib(n) {
  let dp = [];
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// console.log(fib(50));

// 跳台阶 一次可以跳上 n 阶
function jumpFloorII(number) {
  let dp = [];
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  if (dp[number]) return dp[number];
  for (i = 3; i <= number; i++) {
    dp[i] = 2 * dp[i - 1];
  }
  return dp[number];
}
console.log("跳台阶：", jumpFloorII(6));

// leetcode 1，两数之和，Map
function twoSum(nums, target) {
  let map = new Map();
  let rest;
  for (let i = 0; i < nums.length; i++) {
    // 用 Map 优化
    rest = target - nums[i];
    if (map.has(rest)) {
      // 返回两个元素的数组下标
      return [map.get(rest), i];
    } else {
      // 在 Map 中添加元素和对应下标
      map.set(nums[i], i);
    }
  }
}
let nums = [3, 2, 4];
let target = 6;
console.log(twoSum(nums, target));

// leetcode 165 比较版本号
function compareVersion(version1, version2) {
  let arr1 = version1.split("."),
    arr2 = version2.split(".");
  let len1 = arr1.length,
    len2 = arr2.length;
  let len = Math.max(len1, len2);
  let res1 = 0,
    res2 = 0;

  for (let i = 0; i < len; i++) {
    arr1[i] = arr1[i] === undefined ? 0 : arr1[i];
    arr2[i] = arr2[i] === undefined ? 0 : arr2[i];
    arr1[i] -= 0;
    arr2[i] -= 0;
  }
  res1 = arr1.join("") - 0;
  res2 = arr2.join("") - 0;

  if (res1 - res2 > 0) {
    return 1;
  } else if (res1 - res2 < 0) {
    return -1;
  } else {
    return 0;
  }
}

let version1 = "1.0",
  version2 = "1.0.0";
console.log("比较版本号：", compareVersion(version1, version2));

// 小红书 笔记草稿
function getScript(str) {
  let len = str.length;
  let res = "";
  let isIgnore = false;
  let p = 0;
  let count = 0;

  while (p < len) {
    if (str[p] === "(") {
      isIgnore = true;
      count++;
    }
    if (str[p] === ")") {
      count--;
      if (count === 0) {
        isIgnore = false;
      }
      p++;
      continue;
    }
    if (str[p] === "<" && !isIgnore) {
      res = res.slice(0, res.length - 1);
      p++;
      continue;
    }
    if (!isIgnore) {
      res += str[p];
    }
    p++;
  }
  return res;
}

//   let str = "123456789<<<0"; // 1234560
// let str = "Corona(Trump)USA<<";
let str = "<<<123";
console.log("笔记草稿：", getScript(str));

//   let str = "Corona(Trump)USA(script)<<<<<";
//   let str = "(12345678909987654321234567890987654321)";

// 敏感词过滤
function filterStr(str, list) {
  for (const e of list) {
    str = str.replace(e, "*".repeat(e.length));
  }
  return str;
}

let input = "have sex 想自杀";
let list = ["sex", "自杀"];
console.log("敏感词过滤：", filterStr(input, list));

// 最长公共子串 二维数组，dp
function longest(str1, str2) {
  let len1 = str1.length,
    len2 = str2.length;
  if (!len1 || !len2) return ["", 0];
  let maxLen = 0;
  let index;

  let arr = new Array(len2);
  for (let k = 0; k < len1; k++) {
    arr[k] = new Array(len1).fill(0);
  }

  for (let m = 0; m < len1; m++) {
    for (let n = 0; n < len2; n++) {
      if (str1[m] === str2[n]) {
        if (m === 0 || n === 0) {
          arr[n][m] = 1;
          maxLen = 1;
        } else {
          arr[n][m] = arr[n - 1][m - 1] + 1;
          if (arr[n][m] > maxLen) {
            maxLen = arr[n][m];
            index = m;
          }
        }
      }
    }
  }

  return [str1.substring(index - maxLen + 1, index + 1), maxLen];
}
// let str1 = "acbcbcef";
let str1 = "acbcbcef";
// let str2 = "abcbced";
let str2 = "";
console.log("最长公共子串：", longest(str1, str2));

// 机器人的运动范围 图、二维数组
const movingCount = function (m, n, k) {
  if (k === 0) return 1;

  // 方向数组 分别为上 下 左 右
  const directionArr = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  // set 用于存放已经走过的坐标
  let set = new Set();
  set.add("0,0");

  // 将要遍历的坐标队列，从 0, 0 开始
  let queue = [[0, 0]];

  while (queue.length) {
    // 将第一个坐标出队
    let [x, y] = queue.shift();

    // 遍历方向
    for (let i = 0; i < 4; i++) {
      let offsetX = x + directionArr[i][0];
      let offsetY = y + directionArr[i][1];

      // 判断临界值
      if (
        offsetX < 0 ||
        offsetX >= n ||
        offsetY < 0 ||
        offsetY >= m ||
        proceed(offsetX) + proceed(offsetY) > k ||
        set.has(`${offsetX},${offsetY}`)
      ) {
        continue;
      }

      // 走过的格子就不再纳入统计
      set.add(`${offsetX},${offsetY}`);
      // 将该坐标加入队列。因为这个坐标的四周没有走过，需要纳入下次的遍历
      queue.push([offsetX, offsetY]);
    }
  }

  function proceed(num) {
    let sum = 0;
    while (num) {
      sum += num % 10;
      num = (num / 10) | 0;
    }
    return sum;
  }

  return set.size;
};

console.log("机器人的运动范围：", movingCount(3, 2, 3));

// 大数相加
const addStrings = function (a, b) {
  let arr1 = a.split(""),
    arr2 = b.split("");

  if (Math.max(arr1.length, arr2.length) === 1) return a - 0 + (b - 0) + "";
  let temp = 0;
  let sum = "";
  while (arr1.length || arr2.length || temp) {
    // 两次按位非 将字符串转换成数字
    temp += ~~arr1.pop() + ~~arr2.pop();
    sum = (temp % 10) + sum;
    temp = temp > 9 ? 1 : 0;
  }

  return sum.replace(/^0/g, "");
};

//22222222222222222
// console.log(addStrings("11111111111111112", "1111111111111111"));
// 602
// console.log(addStrings("8", "19"));
console.log("数字字符串相加：", addStrings("999", "999"));

// 回文字符串 双指针法
function isPalindrome(s) {
  let str = s.replace(/\W/g, "");
  let p = 0,
    q = str.length - 1;
  let result = true;
  while (p < q) {
    if (str[p].toLowerCase() !== str[q].toLowerCase()) {
      return false;
    }
    p++;
    q--;
  }
  return result;
}

console.log("回文字符串：", isPalindrome("A man, a plan, a canal: Panama"));

// 回文字符串 翻转数组
function isPalindrome1(s) {
  s = s.replace(/\W/g, "").toLowerCase();
  let newStr = s.split("").reverse().join("");

  return s === newStr;
}
console.log("回文字符串：", isPalindrome1("A man, a plan, a canal: Panama"));

// 回文数 翻转数组
function isPalindromeNum(x) {
  x += "";
  return x === x.split("").reverse().join("");
}
console.log("回文数：", isPalindrome(121));

// 双指针
function isPalindromeNum1(x) {
  x += "";
  let p = 0,
    q = x.length - 1;
  let result = true;
  while (p < q) {
    if (x[p] !== x[q]) {
      return false;
    }
    p++;
    q--;
  }
  return result;
}
console.log("回文数：", isPalindrome1(121));

// 直接操作数字
function isPalindromeNum2(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let half = 0;
  while (x > half) {
    // 计算末尾的数字
    half = (x % 10) + half * 10;
    x = (x / 10) | 0;
  }

  return x === half || x === ((half / 10) | 0);
}
console.log("回文数：", isPalindrome2(121));

// 翻转整数
const reverse = function (x) {
  let reverseX = 0;

  while (x != 0) {
    reverseX *= 10;
    reverseX += x % 10;
    x = (x / 10) | 0;
  }

  // leetcode 溢出判断
  // reverseX = reverseX > 2147483647 || reverseX < -2147483648 ? 0 : reverseX;
  return reverseX;
};
console.log("翻转整数：", reverse(1534236469));
console.log("翻转整数：", reverse(321));
console.log("翻转整数：", reverse(-321));

// 只出现一次的数字 排序遍历
const singleNumber = function (nums) {
  nums.sort((a, b) => a - b);

  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] !== nums[i + 1] && nums[i] !== nums[i - 1]) {
      return nums[i];
    }
  }
};
console.log("只出现一次的数字：", singleNumber([4, 1, 2, 1, 2]));

// 只出现一次的数字 异或
const singleNumber1 = function (nums) {
  let temp = nums[0];
  let len = nums.length;
  for (let i = 1; i < len; i++) {
    temp ^= nums[i];
  }
  return temp;
};
console.log("只出现一次的数字：", singleNumber1([4, 1, 2, 1, 2]));

// 买卖股票 一次 for 循环
const maxProfit = function (prices) {
  let profit = 0,
    min = prices[0];

  for (const p of prices) {
    // 最低价格买入
    min = Math.min(p, min);
    profit = Math.max(p - min, profit);
  }
  return profit;
};

let prices = [7, 1, 5, 3, 6, 4];
// let prices = [7, 6, 4, 3, 1];
// let prices = [2, 4, 1];
console.log("买卖股票：", maxProfit(prices));

// 打家劫舍
const rob = function (nums) {
  let len = nums.length;
  if (!len) return 0;
  if (len === 1) return nums[0];
  let dp = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp[len - 1];
};
console.log("打家劫舍：", rob([2, 7, 9, 3, 1]));

// 不同路径
const uniquePaths = function (m, n) {
  let dp = new Array(n);
  for (let k = 0; k < n; k++) {
    dp[k] = new Array(m).fill(0);
    dp[0] = new Array(m).fill(1);
    dp[k][0] = 1;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[n - 1][m - 1];
};
console.log("不同路径：", uniquePaths(7, 3));

// 不同路径2 障碍物
const uniquePathsWithObstacles = function (grid) {
  let row = grid.length;
  let col = grid[0].length;

  if (grid[0][0] !== 0) {
    return 0;
  }

  let dp = new Array(row);
  for (let k = 0; k < row; k++) {
    dp[k] = new Array(col).fill(0);
  }

  dp[0][0] = 1;
  // 第一列
  for (let n = 1; n < row; n++) {
    if (grid[n][0] !== 1) {
      dp[n][0] = dp[n - 1][0];
    }
  }
  // 第一行
  for (let m = 1; m < col; m++) {
    if (grid[0][m] !== 1) {
      dp[0][m] = dp[0][m - 1];
    }
  }

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (grid[i][j] !== 1) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[row - 1][col - 1];
};
let grid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

console.log("不同路径：", uniquePathsWithObstacles(grid));

// leetcode 53 最大子序和
const maxSubArray = function (nums) {
  let dp = nums[0],
    len = nums.length;
  let result = dp;

  for (let i = 1; i < len; i++) {
    // dp 表示以 nums[i] 结尾的 最大子序和的大小
    dp = Math.max(nums[i] + dp, nums[i]);
    result = Math.max(dp, result);
  }

  return result;
};

let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log("最大子序列和：", maxSubArray(nums));

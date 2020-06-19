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

// leetcode 1
function twoSum(nums, target) {
  let map = new Map();
  let rest;
  for (let i = 0; i < nums.length; i++) {
    // 用 Map 优化
    rest = target - nums[i];
    if (map.has(rest)) {
      return [map.get(rest), i];
    } else {
      map.set(nums[i], i);
    }
  }
}
let nums = [3, 2, 4];
let target = 6;
console.log(twoSum(nums, target));

// leetcode 比较版本号
function compareVersion(version1, version2) {
  let arr1 = version1.split("."),
    arr2 = version2.split(".");
  let len1 = arr1.length,
    len2 = arr2.length;
  let len = Math.max(len1, len2);
  let res1 = 0,
    res2 = 0;
  arr2.length = arr1.length = len;

  for (let i = 0; i < len; i++) {
    arr1[i] = arr1[i] === undefined ? 0 : arr1[i];
    arr2[i] = arr2[i] === undefined ? 0 : arr2[i];
    arr1[i] -= 0;
    arr2[i] -= 0;
    let level = len - i - 1;
    res1 += arr1[i] * Math.pow(10, level);
    res2 += arr2[i] * Math.pow(10, level);
  }

  console.log(res1, res2);
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
  let leftIndex;
  let rightIndex;
  let strLeft;
  let strRight;
  let p = 0;

  while (p <= str.length) {
    if (str[p] === "(") {
      leftIndex = p;
      p++;
    } else if (str[p] === ")") {
      rightIndex = p;
      let deletedLen = rightIndex - leftIndex;
      strLeft = str.slice(0, leftIndex);
      strRight = str.slice(rightIndex + 1);
      str = strLeft + strRight;
      p -= deletedLen;
    } else if (str[p] === "<") {
      if (p === 0) {
        str = str.slice(p + 1);
      } else if (p > 0) {
        strLeft = str.slice(0, p - 1);
        strRight = str.slice(p + 1);
        str = strLeft + strRight;
      }
      p--;
    } else {
      p++;
    }
  }
  return str;
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

// 最长公共子串
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

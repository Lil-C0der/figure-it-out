function _Node(val) {
  this.val = val;
  this.children = [];
}
const tree = {
  val: '1',
  children: [
    {
      val: '2',
      children: [
        {
          val: '2-1',
          children: [
            {
              val: '2-1-1'
            }
          ]
        },
        {
          val: '2-2',
          children: [
            {
              val: '2-2-1'
            }
          ]
        }
      ]
    },
    {
      val: '3',
      children: [
        {
          val: '3-1',
          children: [
            {
              val: '3-1-1'
            }
          ]
        },
        {
          val: '3-2'
        }
      ]
    }
  ]
};

/**
 * 递归的 dfs
 * @param {_Node} root
 * @param {Array<string>} nodeList
 * @return {Array<string>}
 */
function dfs(root, nodeList = []) {
  nodeList.push(root.val);
  const { children } = root;
  if (children?.length) {
    children.forEach((childNode) => {
      dfs(childNode, nodeList);
    });
  }
  return nodeList;
}
// console.log(dfs(tree));

/**
 * 非递归的 dfs，借助栈实现
 * @param {_Node} root
 * @return {Array<string>}
 */
function dfs2(root) {
  let stack = [];
  let nodeList = [];
  stack.push(root);
  while (stack.length) {
    // 将栈顶元素弹出，放入结果数组
    let node = stack.pop();
    nodeList.push(node.val);
    const { children } = node;
    if (children?.length) {
      // 将所有子节点入栈，由于栈先进后出的特点，所以从后往前开始
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return nodeList;
}
// console.log(dfs2(tree));

/* ====================================== */
/*                                        */
/*               leetcode                 */
/*                                        */
/* ====================================== */

/**
 * 剑指 Offer 12. 矩阵中的路径
 * 判断在一个矩阵中是否存在一条包含某字符串所有字符（word）的路径。
 * 在一条路径中，矩阵中的一个格子只能经过一次
 * @param {Array<Array<string>>} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  const row = board.length;
  const col = board[0].length;
  // 单词长度超过矩阵大小，不可能存在对应的路径
  if (word.length > row * col) {
    return false;
  }
  // 用于记录节点是否被访问过
  let visitedMap = new Map();

  // 对矩阵中的各个节点 dfs，判断是否存在符合的路径
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      // 如果函数 dfs 返回 true，表示找到了路径
      if (dfs(board, word, i, j, 0)) {
        return true;
      }
    }
  }
  return false;
  /**
   * 对单个节点递归搜索，寻找是否存在符合的路径
   * @param {Array<Array<string>>} board
   * @param {string} word
   * @param {number} i  二维数组的 y 坐标
   * @param {number} j  二维数组的 x 左边
   * @param {number} p  word 中目标字符的位置
   * @return {boolean}
   */
  function dfs(board, word, i, j, p) {
    // 节点越界，或者节点已经被访问过
    if (
      i < 0 ||
      i >= row ||
      j < 0 ||
      j >= col ||
      visitedMap.get(`${i}, ${j}`)
    ) {
      return false;
    }
    // 当前节点和目标字符不匹配，直接返回
    if (board[i][j] !== word.charAt(p)) {
      return false;
    }
    // 目标字符是单词的最后一个字母，并且当前节点和目标字符匹配
    if (p === word.length - 1) {
      return true;
    }
    // 将 map 中该节点置为 true
    visitedMap.set(`${i}, ${j}`, true);
    // 上下左右四个方向，如果有一个节点匹配目标字符，则继续 dfs
    let res =
      dfs(board, word, i - 1, j, p + 1) ||
      dfs(board, word, i + 1, j, p + 1) ||
      dfs(board, word, i, j - 1, p + 1) ||
      dfs(board, word, i, j + 1, p + 1);
    if (!res) {
      // 将 map 中该节点置为 false，因为其他路径也可以访问该节点
      visitedMap.set(`${i}, ${j}`, false);
    }

    return res;
  }
}
// console.log(
//   exist(
//     [
//       ['A', 'B', 'C', 'E'],
//       ['S', 'F', 'C', 'S'],
//       ['A', 'D', 'E', 'E']
//     ],
//     // 'BCCE'
//     // 'BFCE'
//     'ABFB'
//     // 'ABCCED'
//   )
// );

/**
 * 剑指 Offer 13. 机器人的运动范围
 * 在 m 行 n 列的矩阵中，机器人从坐标 [0, 0] 开始移动，每次可以向上下左右移动一格（不能移动到方格外）
 * 但不能进入行坐标和列坐标的数位之和大于 k 的格子
 * 例如，当 k = 18 时，机器人能够进入方格 [35, 37] ，因为 3 + 5 + 3 + 7 = 18。
 * 但它不能进入方格 [35, 38]，因为 3 + 5 + 3 + 8 = 19。
 * 请问机器人能够到达多少个格子？
 * @param {*} m
 * @param {*} n
 * @param {*} k
 * @return {*}
 */
function movingCount(m, n, k) {
  let res = 0;
  let visitedMap = new Map();
  dfs(0, 0);
  return res;

  /**
   * 验证横纵坐标的各数位之和是否小于 k，能否进入该节点
   * @param {number} y
   * @param {number} x
   * @return {boolean}
   */
  function validateCoordinate(y, x) {
    return (
      y
        .toString()
        .split('')
        .reduce((prev, curr) => +prev + +curr, 0) +
        x
          .toString()
          .split('')
          .reduce((prev, curr) => +prev + +curr, 0) <=
      k
    );
  }
  /**
   * 对能够进入的节点 dfs
   * @param {number} i
   * @param {number} j
   * @return {void}
   */
  function dfs(i, j) {
    // 节点越界，或者不能进入的节点，或者是已经被访问过的节点
    if (
      i < 0 ||
      i >= m ||
      j < 0 ||
      j >= n ||
      !validateCoordinate(i, j) ||
      visitedMap.get(`${i}, ${j}`)
    ) {
      return;
    }
    visitedMap.set(`${i}, ${j}`, true);
    res++;
    // 如果该节点符合要求，则继续 dfs
    dfs(i - 1, j);
    dfs(i + 1, j);
    dfs(i, j - 1);
    dfs(i, j + 1);
  }
}
// console.log(movingCount(4, 4, 2), movingCount(38, 15, 9));

//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9

const root = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 1,
      left: null,
      right: null
    },
    right: {
      val: 3,
      left: null
    }
  },
  right: {
    val: 7,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 9,
      left: null,
      right: null
    }
  }
};

// 广度优先遍历二叉树，迭代 + 队列实现
const bfs = function (node) {
  let queue = [];
  let res = [];
  queue.push(node);
  while (queue.length) {
    node = queue.shift();
    res.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return res;
};

bfs(root);

// dfs 递归实现
let res = [];
const dfs = function (node) {
  if (node) {
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
};

// dfs 迭代 + 栈实现
const dfs = function (node) {
  let stack = [];
  let res = [];
  stack.push(node);
  while (stack.length) {
    node = stack.pop();
    res.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return res;
};

dfs(root);

// 递归的前序遍历
const preOrder = function (root) {
  if (root !== null) {
    arr.push(root.val);
    preOrder(root.left);
    preOrder(root.right);
  }
};
// 非递归的先序遍历
const preOrder2 = function (root) {
  let stack = [];
  let res = [];
  stack.push(root);
  while (stack.length > 0) {
    let root = stack.pop();
    res.push(root.data);
    if (root.right) {
      stack.push(root.right);
    }
    if (root.left) {
      stack.push(root.left);
    }
  }
  return res;
};

// 递归的中序遍历
const midOrder = function (root) {
  if (root !== null) {
    midOrder(root.left);
    arr.push(root.val);
    midOrder(root.right);
  }
};
// 非递归的中序遍历
const midOrder2 = function (root) {
  let stack = [];
  let res = [];
  while (stack.length > 0 || root) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      res.push(root.data);
      root = root.right;
    }
  }
  return res;
};

// 递归的后序遍历
const postOrder = function (root) {
  if (root !== null) {
    postOrder(root.left);
    postOrder(root.right);
    arr.push(root.val);
  }
};
// 非递归的后序遍历，在先序遍历的基础上把返回数组 reverse
const postOrder2 = function (root) {
  let stack = [];
  let res = [];
  stack.push(root);
  while (stack.length > 0) {
    let root = stack.pop();
    res.push(root.data);
    if (root.left) {
      stack.push(root.left);
    }
    if (root.right) {
      stack.push(root.right);
    }
  }
  return res.reverse();
};

/* ====================================== */
/*                                        */
/*               leetcode                 */
/*                                        */
/* ====================================== */

// 翻转二叉树 递归
const invertTree = function (root) {
  if (root) {
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
  }
  return root;
};
// 翻转二叉树 迭代，利用栈实现
const invertTree2 = function (root) {
  let stack = [],
    node = null;
  stack.push(root);
  while (stack.length) {
    node = stack.pop();
    if (node) {
      [node.left, node.right] = [node.right, node.left];
      stack.push(node.left);
      stack.push(node.right);
    }
  }
  return root;
};

// leetcode 104 二叉树的最大深度
// 利用队列 bfs
const maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  let queue = [];
  let depth = 0;
  queue.push(root);
  // 类似层次遍历
  while (queue.length) {
    // 当前层级的节点数目
    const size = queue.length;
    // 将下一层级的所有节点入队
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    depth++;
  }
  return depth;
};
// 递归 dfs
const maxDepth2 = function (root) {
  if (!root) {
    return 0;
  }
  let leftDepth = maxDepth2(root.left);
  let rightDepth = maxDepth2(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
};

// leetcode 617 合并二叉树，递归实现
function mergeTrees(t1, t2) {
  if (t1 === null) {
    return t2;
  }
  if (t2 === null) {
    return t1;
  }
  if (t1 && t2) {
    t1.val += t2.val;
    t1.left = mergeTrees(t1.left, t2.left);
    t1.right = mergeTrees(t1.right, t2.right);
  }
  return t1;
}

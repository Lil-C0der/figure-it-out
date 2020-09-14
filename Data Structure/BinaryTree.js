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

// 翻转二叉树 递归
const invertTree = function (root) {
  if (root) {
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
  }
  return root;
};

// 翻转二叉树 迭代
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

const bfs = function (node) {
  let queue = [];
  let res = [];
  queue.push(node);
  while (queue.length) {
    node = queue.shift();
    res2.push(node.val);
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

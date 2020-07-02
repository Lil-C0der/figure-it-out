// 递归
const invertTree = function (root) {
  if (root) {
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
  }
  return root;
};

// 迭代
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

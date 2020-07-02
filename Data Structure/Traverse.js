// 递归的前序遍历
const preOrder = function (root) {
  if (root !== null) {
    arr.push(root.val);
    preOrder(root.left);
    preOrder(root.right);
  }
};

// 递归的中序遍历
const midOrder = function (root) {
  if (root !== null) {
    midOrder(root.left);
    arr.push(root.val);
    midOrder(root.right);
  }
};

// 递归的后序遍历
const postOrder = function (root) {
  if (root !== null) {
    postOrder(root.left);
    postOrder(root.right);
    arr.push(root.val);
  }
};

// 非递归的先序遍历
const preOrder = function (root) {
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

// 非递归的中序遍历
const midOrder = function (root) {
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

// 非递归的后序遍历，在先序遍历的基础上把返回数组 reverse
function postOrder(root) {
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
}

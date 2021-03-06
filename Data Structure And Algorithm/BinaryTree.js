function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
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
const dfs2 = function (node) {
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

/**
 * leetcode 105 根据前序遍历序列和中序遍历序列（数组）重建二叉树
 * 数组 slice
 * @param {Array<number>} preOrder
 * @param {Array<number>} inOrder
 * @return {TreeNode} 创建的二叉树
 */
const buildTree = function (preOrder, inOrder) {
  if (preOrder.length && inOrder.length) {
    const node = preOrder.shift();
    const nodeIdx = inOrder.indexOf(node);
    const leftArr = inOrder.slice(0, nodeIdx);
    const rightArr = inOrder.slice(nodeIdx + 1);

    let treeNode = new TreeNode(node);
    treeNode.left = buildTree(preOrder, leftArr);
    treeNode.right = buildTree(preOrder, rightArr);
    return treeNode;
  } else {
    return null;
  }
};
/**
 * leetcode 105 指针
 * @param {Array<number>} preOrder
 * @param {Array<number>} inOrder
 * @param {number} left
 * @param {number} right
 * @return {TreeNode} 创建的二叉树
 */
function buildTree2(preOrder, inOrder, left = 0, right = preOrder.length - 1) {
  if (left <= right) {
    let nodeVal = preOrder.shift();
    const nodeIdx = inOrder.indexOf(nodeVal);
    const treeNode = new TreeNode(nodeVal);
    treeNode.left = buildTree(preOrder, inOrder, left, nodeIdx - 1);
    treeNode.right = buildTree(preOrder, inOrder, nodeIdx + 1, right);
    return treeNode;
  } else {
    return null;
  }
}

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

/**
 * leetcode 513. 找树左下角的值
 * 给定一个二叉树，在树的最后一行找到最左边的值。
 * @param {TreeNode} root
 * @return {number}
 * 需要返回最后一行，最左的值：考虑通过层次遍历，记录深度 depth 和 各层的节点，最后返回最后一层的第一个节点
 */
function findBottomLeftValue(root) {
  let valArr = [];
  bfs(root, valArr);
  let temp = valArr.pop();
  return temp ? temp : 0;

  function bfs(root, res) {
    let queue = [];
    let depth = 0;
    queue.push(root);
    while (queue.length) {
      // size 表示当前层次的节点个数
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let node = queue.shift();
        if (node) {
          // push 的时候可以判断，只push当前层级的第一个节点
          // 如depth为1时，res长度也为1，则说明第2层的节点还没push
          res.length === depth && res.push(node.val);
          node.left && queue.push(node.left);
          node.right && queue.push(node.right);
        }
      }
      depth++;
    }
  }
}
// console.log('res', findBottomLeftValue(root));
// console.log(
//   'res',
//   findBottomLeftValue({
//     val: 1,
//     left: { val: 2, left: { val: 4 }, right: null },
//     right: {
//       val: 3,
//       left: { val: 5, left: { val: 7 }, right: null },
//       right: { val: 6 }
//     }
//   })
// );

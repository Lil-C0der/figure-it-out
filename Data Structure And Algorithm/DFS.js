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
console.log(dfs(tree));

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
console.log(dfs2(tree));

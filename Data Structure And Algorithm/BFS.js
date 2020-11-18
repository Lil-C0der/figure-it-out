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
 * 借助队列实现的 bfs
 * @param {_Node} root
 * @return {Array<string>}
 */
function bfs(root) {
  let queue = [];
  let nodeList = [];
  queue.push(root);
  while (queue.length) {
    // 将队头元素出队，队列可以保证遍历完同层级节点后，再遍历下一层级
    const node = queue.shift();
    nodeList.push(node.val);
    const { children } = node;
    if (children?.length) {
      children.forEach((childNode) => {
        queue.push(childNode);
      });
    }
  }

  return nodeList;
}

console.log(bfs(tree));

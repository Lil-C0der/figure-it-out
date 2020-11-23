function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 1 -> 3 -> 2
const linkList = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 2,
      next: null
    }
  }
};

/**
 * 翻转链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head) return null;
  let curr = head;
  let prev = null;

  while (curr) {
    // temp 即为当前的下一个
    let temp = curr.next;
    // 将当前节点指向上一个节点，即 prev
    curr.next = prev;
    // 指针右移
    prev = curr;
    curr = temp;
  }
  // 当 curr 为 NULL 时，表示翻转完成，返回前一个节点
  return prev;
};

/**
 * 剑指 Offer 18. 删除链表的节点
 * @param {ListNode | null} head
 * @param {number} val
 * @return {ListNode}
 */
function deleteNode(head, val) {
  if (!head) {
    return null;
  }
  let curr = head;
  // 保存上一个节点
  let prev = null;
  while (curr) {
    if (curr.val === val) {
      // prev 为空时，curr 指向头节点，表示需要被删除的是头节点，所以直接返回头节点的下一个节点
      if (!prev) {
        return curr.next;
      } else {
        // 当不为头节点的时候，改变指针指向
        prev.next = curr.next;
      }
    }
    prev = curr;
    curr = curr.next;
  }
  return head;
}
// 分别删除中间的节点和头节点
// console.log(deleteNode(linkList, 3));
// console.log(deleteNode(linkList, 1));

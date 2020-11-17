/**
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

  // 当 curr 为 NULL 时，表示反转完成，返回前一个节点
  return prev;
};

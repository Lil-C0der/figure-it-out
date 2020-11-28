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

/**
 * leetcode 2. 两数相加
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 示例：
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  let curr1 = l1,
    curr2 = l2;
  // 有可能链表 l1 的长度 < l2，l1 需要新建节点
  // 所以 prev1 用于记录链表 l1 当前节点的前一个节点，将新增的节点挂在前一个节点上
  let prev1 = curr1;
  let over = 0;
  // 对于模拟加法的处理，注意循环的条件需要加上控制进位的 over，因为相加后，数位可能增加，例如两位数 => 三位数
  while (curr1 || curr2 || over) {
    let val1 = curr1?.val || 0,
      val2 = curr2?.val || 0;
    // 在 l1 的基础上相加
    if (!curr1) {
      let newNode = new ListNode((val1 + val2 + over) % 10);
      prev1?.next = newNode;
      // 指针 curr1 指向新增的节点
      curr1 = newNode;
    } else {
      curr1.val = (val1 + val2 + over) % 10;
    }
    // 处理进位
    over = val1 + val2 + over >= 10 ? 1 : 0;
    prev1 = curr1;
    curr1 = curr1?.next;
    curr2 = curr2?.next;
  }
  return l1;
}

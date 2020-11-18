/**
 * 剑指 Offer 09. 用两个栈实现队列
 */
const CQueue = function () {
  // 一个栈存放入队的元素，一个栈存放出队的元素
  this.inStack = [];
  this.outStack = [];
};
/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.inStack.push(value);
};
/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  // 如果第二个栈中有元素，则栈顶的元素就是队首的元素，直接出队
  if (this.outStack.length) {
    return this.outStack.pop();
  }
  // 如果第二个栈为空，先将第一个栈中所有的元素弹出，并推入第二个栈中
  while (this.inStack.length !== 0) {
    this.outStack.push(this.inStack.pop());
  }
  // 再将栈顶元素弹出，当栈顶元素为空时返回 -1
  return this.outStack.pop() || -1;
};
let cq = new CQueue();
console.log(
  cq.appendTail(3),
  cq.deleteHead(),
  cq.deleteHead(),
  cq.deleteHead()
);

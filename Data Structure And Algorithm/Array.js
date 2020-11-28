/**
 * 剑指 Offer 17. 打印从1到最大的n位数
 * 输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。
 * 比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。
 * @param {number} n
 * @return {void}
 */
// 考虑处理大数的情况，用数组来表示一个数字
function printNumbers(n) {
  let limit = Math.pow(10, n);
  // 表示一个数字，数组各元素为数字各个位
  let baseArr = new Array(n).fill(0);
  for (let i = 1; i < limit; i++) {
    console.log(addOne(baseArr));
  }

  /**
   * 返回参数 baseArr 加 1 后的结果
   * @param {Array<number>} baseArr
   * @return {Array<number>}
   */
  function addOne(baseArr) {
    let p = baseArr.length - 1;
    // 表示进位
    let carry = 1;

    while (p >= 0 && carry > 0) {
      // 需要进位
      if (+baseArr[p] + 1 >= 10) {
        baseArr[p] = 0;
        carry = 1;
      } else {
        baseArr[p] = +baseArr[p] + 1;
        carry = 0;
      }
      p--;
    }
    return baseArr;
  }
}
// printNumbers(2);

/**
 * leetcode 48. 旋转图像
 * 给定一个 n × n 的二维矩阵表示一个图像，将图像顺时针旋转 90 度。 必须在原地旋转图像，请不要使用另一个矩阵来旋转图像。
 * [                   [
 *  [1,2,3],             [7,4,1],
 *  [4,5,6],    =>       [8,5,2],
 *  [7,8,9]              [9,6,3]
 * ]                   ]
 * @param {Array<Array<number>>} matrix
 */
function rotateMatrix(matrix) {
  let len = matrix.length;
  // 可以发现；旋转后的矩阵的每一行就是原先矩阵的每一列
  // 所以考虑遍历矩阵的每一列，将各元素作为新的行，push 到矩阵中，然后通过 splice 方法移除原先的行
  for (let i = 0; i < len; i++) {
    // 新增的行，存放遍历的结果
    let newRow = [];
    for (let j = len - 1; j >= 0; j--) {
      newRow.push(matrix[j][i]);
    }
    // 将遍历的结果push到矩阵中
    matrix.push(newRow);
  }
  // 删除矩阵原先的行
  matrix.splice(0, len);
  console.log(matrix);
}
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
// rotateMatrix(matrix);

// 找规律，利用 map 记录翻转后索引和元素的关系
function rotateMatrixByMap(matrix) {
  // 可以发现：对于索引为 [i][j] 这个位置，翻转后这个位置的元素是原先索引为 [len - 1 - j][i] 的元素
  // 所以利用map来记录这个对应关系，再遍历矩阵，替换对应的元素，需要遍历两次矩阵
  let len = matrix.length;
  let map = new Map();
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      map.set(`${i}-${j}`, matrix[len - 1 - j][i]);
    }
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      matrix[i][j] = map.get(`${i}-${j}`);
    }
  }
  console.log(matrix);
}
// rotateMatrixByMap(matrix);

/**
 * leetcode 54. 螺旋矩阵
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 * 输入:
 * [
 *   [ 1, 2, 3 ],
 *   [ 4, 5, 6 ],
 *   [ 7, 8, 9 ]
 * ]
 * 输出: [1,2,3,6,9,8,7,4,5]
 * @param {Array<Array<number>>} matrix
 * @return {Array<number>}
 * 通过上下左右四个代表矩阵边界位置的指针，按顺序遍历矩阵并将对应元素 push 到结果数组中
 */
function spiralOrder(matrix) {
  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1;
  // 矩阵中元素的个数，方便遍历时及时终止遍历
  let size = (right + 1) * (bottom + 1);
  let res = [];
  while (top <= bottom && left <= right) {
    // 遍历矩阵上方（第一行）的元素
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    top++;
    // 遍历矩阵右边（最后一列）的元素
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    right--;
    // 注意：在遍历过程中有可能已经遍历完所有的元素了，需要break 停止遍历
    if (res.length === size) {
      break;
    }
    // 遍历矩阵底边（最后一行）的元素
    for (let i = right; i >= left; i--) {
      res.push(matrix[bottom][i]);
    }
    bottom--;
    // 遍历矩阵左边（第一列）的元素
    for (let i = bottom; i <= top; i++) {
      res.push(matrix[i][left]);
    }
    left++;
  }

  return res;
}
let matrix1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];
// console.log(spiralOrder(matrix));  //  [1,2,3,6,9,8,7,4,5]
// console.log(spiralOrder(matrix1)); //  [1,2,3,4,8,12,11,10,9,5,6,7]

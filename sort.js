// 快速排序 左右指针递归
const quickSort = function (arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    let pivot = arr[start];
    let p = start,
      q = end;
    while (p < q) {
      // 从右边指针开始移动，直到元素小于 pivot
      while (p < q && arr[q] >= pivot) {
        q--;
      }
      // 移动左边的指针，找到一个大于 pivot 的元素
      while (p < q && arr[p] <= pivot) {
        p++;
      }
      // 在左边找到大于 pivot 的元素以后和右边小于 pivot 的元素交换
      [arr[p], arr[q]] = [arr[q], arr[p]];
    }
    // 交换 pivot 和 指针重合位置的元素
    [arr[p], arr[start]] = [arr[start], arr[p]];
    // 在前半部分和后半部分重复之前的排序操作
    quickSort(arr, start, p - 1);
    quickSort(arr, p + 1, end);
    return arr;
  }
};

// 快速排序 阮一峰版
const quickSort2 = function (arr) {
  if (len <= 0) return arr;
  let mid = (len / 2) | 0;
  let pivot = arr.splice(mid, 1);

  let left = [];
  let right = [];

  for (const e of arr) {
    if (e < pivot) {
      left.push(e);
    } else right.push(e);
  }
  return quickSort(left).concat(pivot, ...quickSort(right));
};

// 冒泡排序
const bubbleSort = function (arr) {
  let len = arr.length;
  // i 控制排序的长度
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

// 选择排序
const selectSort = function (arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        // 记录最小位置
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
};

// 插入排序
const insertSort = function (arr) {
  let len = arr.length;
  // 从索引为 1 开始，往前插入
  for (let i = 1; i < len; i++) {
    // 获取索引为 i 的元素，与前面进行比较
    let current = arr[i];
    let prevIndex = i - 1;
    while (arr[prevIndex] > current && prevIndex >= 0) {
      // 把前面更大的元素向后移一位
      arr[prevIndex + 1] = arr[prevIndex];
      prevIndex--;
    }
    // 在合适的位置插入 current
    arr[prevIndex + 1] = current;
  }
  return arr;
};

// 希尔排序
const shellSort = function (arr) {
  let len = arr.length;
  // 向下取整 计算取值的间隔
  let delta = (len / 2) | 0;
  while (delta >= 1) {
    // 以 delta 为增量进行分组
    for (let i = delta; i < len; i++) {
      let current = arr[i];
      let prevIndex = i - delta;
      // 分组内的插入排序
      while (arr[prevIndex] > current && prevIndex >= 0) {
        arr[prevIndex + delta] = arr[prevIndex];
        prevIndex -= delta;
      }
      // 在合适的位置插入 current
      arr[prevIndex + delta] = current;
    }
    delta = (delta / 2) | 0;
  }
  return arr;
};

// let arr = [2, 9, 4, 3, 6, 0, 5, 8, 7, 1];
// let arr = [1, 5, 3, 7, 6, 4, 2];
// let arr = [6, 2, 7, 3, 8, 9];
// let arr = [7, 8, 1, 7, 2, 4, 6];
let arr = [7, 8, 1, 7, 2, 4, 6, 3, 4, 0];
// let arr = [81, 94, 11, 94, 12, 35, 17, 95, 28, 58, 41, 75, 15];
// console.pg(bubbleSort(arr));
// console.pg(selectSort(arr));
// console.pg(insertSort(arr));
// console.pg(shellSort(arr));
console.log(quickSort(arr, 0, arr.length - 1));

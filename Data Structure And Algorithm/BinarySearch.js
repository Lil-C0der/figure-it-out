/**
 * 剑指 Offer 11. 旋转数组的最小数字
 * @param {Array<number>} nums
 * @return {number} 最小值
 */
function minArr(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    // (left + right) / 2 有可能导致大数溢出，改用减法规避
    let mid = (left + (right - left) / 2) | 0;
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      right--;
    }
  }
  // left right 指针是重合的
  return nums[right];
}

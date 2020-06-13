// 防抖
function debounce(fn, delay, immediate) {
  let timer = null;
  function debounceFn(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    // 如果没有定时器，则表示函数第一次被调用
    if (immediate && !timer) {
      timer = setTimeout(() => {
        // 把定时器置为 null，方便后面的判断
        timer = null;
        console.log("清空");
      }, delay);
      fn.apply(this, args);
      return;
    }
    // 设置定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
  return debounceFn;
}

// 节流
function throttle(fn, interval) {
  let cd = false;
  function throttleFn(...args) {
    if (!cd) {
      fn.apply(this, args);
      // 表示已经函数已经被调用，正在冷却中
      cd = true;
      setTimeout(() => {
        // 冷却结束
        cd = false;
      }, interval);
    }
  }
  return throttleFn;
}

export { debounce, throttle };

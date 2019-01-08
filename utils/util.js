
// 节流函数
const thorttle = function (func, wait = 100) {
  // 利用闭包保存定时器和上次执行时间
  let timer = null;
  let previous; // 上次执行时间

  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this;
    const args = arguments;
    const now = +new Date();
    if (previous && now < previous + wait) { // 周期之中
      clearTimeout(timer);
      timer = setTimeout(function () {
        previous = now;
        func.apply(context, args);
      }, wait);
    } else {
      previous = now;
      func.apply(context, args);
    }
  };
}

module.exports = {
  thorttle: thorttle
}

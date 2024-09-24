function debounce(fn, delay) {
  let timer = null

  const _debounce = function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    // 将接收的参数和this传递给实际执行的函数
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }

  return _debounce
}
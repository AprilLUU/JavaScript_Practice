function debounce(fn, delay, immediate = false) {
  let timer = null
  // 判断函数是否立即执行过
  let isInvoke = false

  const _debounce = function(...args) {
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        isInvoke = false
      }, delay)
    }
  }

  return _debounce
}
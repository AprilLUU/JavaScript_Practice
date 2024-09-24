function throttle(fn, interval) {
  let lastTime = 0

  const _throttle = function(...args) {
    const nowTime = new Date().getTime()
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      fn.apply(this, args)
      lastTime = nowTime
    }
  }

  return _throttle
}
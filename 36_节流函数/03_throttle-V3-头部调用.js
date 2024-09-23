function throttle(fn, interval, optinons = { leading: true }) {
  let lastTime = 0
  const { leading } = optinons

  const _throttle = function(...args) {
    const nowTime = new Date().getTime()
    //第一次是否触发函数 lastTime = 0时即为第一次触发事件
    if (!lastTime && !leading) lastTime = nowTime
    
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      fn.apply(this, args)
      lastTime = nowTime
    }
  }

  return _throttle
}
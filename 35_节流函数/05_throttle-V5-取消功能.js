function throttle(fn, interval, optinons = { leading: true, trailing: false }) {
  let lastTime = 0
  let timer = null
  const { leading, trailing } = optinons

  const _throttle = function(...args) {
    const nowTime = new Date().getTime()
    if (!lastTime && !leading) lastTime = nowTime
    
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      lastTime = nowTime
      return
    }

    if (trailing && !timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        lastTime = !leading ? 0 : new Date().getTime()
        timer = null
      }, remainTime)
    }
  }

  _throttle.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle
}
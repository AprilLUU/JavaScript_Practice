function throttle(fn, interval, optinons = { leading: true, trailing: false }) {
  let lastTime = 0
  let timer = null
  const { leading, trailing } = optinons

  const execFunWithError = function(fun, thisArg, args, resolve, reject) {
    try {
      const result = fun.apply(thisArg, args)
      console.log("throttle")
      resolve(result)
    } catch(err) {
      reject(err)
    }
  }

  const _throttle = function(...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime()
      if (!lastTime && !leading) lastTime = nowTime
      
      const remainTime = interval - (nowTime - lastTime)
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        execFunWithError(fn, this, args, resolve, reject)
        lastTime = nowTime
        return
      }
  
      if (trailing && !timer) {
        timer = setTimeout(() => {
          execFunWithError(fn, this, args, resolve, reject)
          lastTime = !leading ? 0 : new Date().getTime()
          timer = null
        }, remainTime)
      }
    })
  }

  _throttle.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle
}
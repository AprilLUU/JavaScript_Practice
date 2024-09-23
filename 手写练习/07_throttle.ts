
function throttle(fn: any, interval: number, options = { leading: true, trailing: false }) {
  let timer = null
  let lastTime = 0
  const { leading, trailing } = options

  const _execFunWithError = function(fn: any, thisArg: any, resolve: any, reject: any, ...args: any[]) {
    try {
      const result = fn.apply(thisArg, args)
      resolve(result)
    } catch(err) {
      reject(err)
    }
  }

  /**
   * leading: false trailing: false
   * remianTime <= 0 执行函数
   * leading: true trailing: false
   * lastTime = 0 直接执行
   * leading: false trailing: true
   * 开启定时器 
   * 如果时间触发的时间点为interval 即remianTime = 0 时就会执行函数并清除定时器
   * 如果时间触发的时间点为interval 即remianTime > 0 时函数会在定时器里执行，并将lastTime赋值为0
   * 下一轮触发时间 if (!leading && !lastTime) lastTime = nowTime 满足这个条件 开启新一轮定时 重复以上操作
   * leading: true trailing: true
   * 第一次触发事件直接执行 不会开启定时器
   * 第二次触发 如果remainTime > 0 则会开启定时器
   *           如果reaminTime <= 0 则会直接执行函数 不会开启定时器
   * 第三次触发 如果时间触发的时间点为interval 即remianTime = 0 时就会执行函数并清除定时器
   *           如果时间触发的时间点为interval 即remianTime > 0 时函数会在定时器里执行，
   *           并将lastTime赋值为new Date().getTime()即上次触发事件的时间
   *           直接赋值为0 则下次触发时间remainTime < 0 会直接执行函数 就相当于连续执行了两次函数
   */
  const _throttle = function(...args: any[]) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime()
      if (!leading && !lastTime) lastTime = nowTime
      const remainTime = interval - (nowTime - lastTime)

      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        _execFunWithError(fn, this, resolve, reject, ...args)
        lastTime = nowTime
        return
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          _execFunWithError(fn, this, resolve, reject, ...args)
          // lastTime = new Date().getTime()
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
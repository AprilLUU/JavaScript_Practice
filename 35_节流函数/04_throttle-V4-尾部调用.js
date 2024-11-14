function throttle(fn, interval, optinons = { leading: true, trailing: false }) {
  let lastTime = 0
  let timer = null
  const { leading, trailing } = optinons
  /**
   * 第一次触发事件 lastTime = 0 timer = null
   * 头部调用：lastTime = 0 remianTime < 0 执行函数
   * 非头部调用： lastTime = nowTime remainTime = interval 等待interval时间执行一次函数
   * 尾部调用： 开启定时器，这个定时器只需开启一次
   * 执行函数调用时：remainTime < 0时要清空定时器并且直接return，函数已经调用，无需再开启定时器
   * leading为true时函数调用两次的情况：
   * 时间间隔interval = 10 第一次触发事件lastTime = 0 remianTime = 10 开启定时器 10s后执行回调
   * 第二次触发事件10.1s 定时器执行完毕 lastTime = 0 remianTime < 0 函数再次触发
   * 因此在定时器触发执行函数时不能把lastTime赋值为0 赋值一个确定的时间
   * leading为false时函数调用两次的情况：
   */
  const _throttle = function(...args) {
    const nowTime = new Date().getTime()
    // 第一次是否触发函数 lastTime = 0时即为第一次触发事件
    // leading为false 即非立即调用 此时时间赋值为当前时间
    if (!lastTime && !leading) {    
      lastTime = nowTime
      // console.log('leading为fasle时lastTime为0时：' + lastTime)
    }
    
    const remainTime = interval - (nowTime - lastTime)
    // console.log('剩余时间' + remainTime)
    if (remainTime <= 0) {
      // 正常调用 清除上一次冷却时间的定时器
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
        // leading为false时 赋值为0 每次都依靠定时器来执行这个函数 即过了一段时间触发函数仍然不会第一次调用
        // leading为true时 赋值为新的时间 计算时间是否需要执行 记录上一次执行时间 即过了interval时间之后仍然触发函数保持第一次调用
        lastTime = !leading ? 0 : new Date().getTime()
        // lastTime = new Date().getTime()
        timer = null
      }, remainTime)
    }
  }

  return _throttle
}
function debounce(fn: any, delay: number, immediate: boolean = false) {
  let timer: any = null
  let isInvoke = false
  
  const execFunWithErr = function(fn: any, thisArg: any, resolve: any, reject: any, ...args: any[]) {
    try {
      const result: any = fn.apply(thisArg, args)
      resolve(result)
    } catch(err) {
      reject(err)
    }
  }

  const _debounce = function(...args: any[]) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      if (immediate && !isInvoke) {
        execFunWithErr(fn, this, resolve, reject, ...args)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          execFunWithErr(fn, this, resolve, reject, ...args)
          timer = null
          isInvoke = false
        }, delay)
      }
    })
  }

  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}
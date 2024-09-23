function debounce(fn, delay, immediate = false) {
  let timer = null
  let isInvoke = false
  
  const execFunWithError = function(fun, thisArg, args, resolve, reject) {
    try {
      const result = fun.apply(thisArg, args)
      resolve(result)
    } catch(err) {
      reject(err)
    }
  }

  const _debounce = function(...args) {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer)
      }
  
      if (immediate && !isInvoke) {
        execFunWithError(fn, this, args, resolve, reject)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          execFunWithError(fn, this, args, resolve, reject)
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
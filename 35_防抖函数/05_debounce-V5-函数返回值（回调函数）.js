function debounce(fn, delay, options = { immediate: false, success, failure }) {
  let timer = null
  let isInvoke = false
  const { immediate, success, failure } = options

  const execFunWithError = function(fun, thisArg, args, successCallback, failureCallback) {
    try {
      const result = fun.apply(thisArg, args)
      successCallback(result)
    } catch(err) {
      failureCallback(err)
    }
  }

  const _debounce = function(...args) {
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate && !isInvoke) {
      execFunWithError(fn, this, args, success, failure)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        execFunWithError(fn, this, args, success, failure)
        timer = null
        isInvoke = false
      }, delay)
    }
  }

  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}
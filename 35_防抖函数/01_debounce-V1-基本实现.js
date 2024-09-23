function debounce(fn, delay) {
  let timer = null

  const _debounce = function() {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn()
    }, delay)
  }

  return _debounce
}
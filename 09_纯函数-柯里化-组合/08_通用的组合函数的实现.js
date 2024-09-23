function composeFn(...fns) {
  let length = fns.length
  for (let i = 0; i < length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new TypeError('params must be functions')
    }
  }

  return function(...args) {
    let index = 0
    let result = length ? fns[index].apply(this, args) : args
    while (++index < length) {
      result = fns[index].call(this, result)
    }
    return result
  }
}

function double(n) {
  return n * 2
}

function square(n) {
  return n * n
}

let newFn = composeFn(double, square)
console.log(newFn(10))

// 组合函数 把一个函数的执行结果传递给另一个函数去执行
function composeFn(...fns) {
  let length = fns.length
  fns.forEach(fn => {
    if (typeof fn !== 'function') {
      throw new TypeError('parameters must be a function')
    }
  })

  return function(...args) {
    let index = 0

    let result = length ? fns[index].apply(this, args) : args

    while (++index < length) {
      result = fns[index].call(this, result) 
    }

    return result
  }
}
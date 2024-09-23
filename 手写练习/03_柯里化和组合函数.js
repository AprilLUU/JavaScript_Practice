function currying(fn) {

  function curried(...args) {
    if (args.length >= fn.length) {
      const result = fn.apply(this, args)
      return result
    } else {
      return curried.bind(this, ...args)
    }
  }

  return curried
}


function composeFn(...fns) {
  let length = fns.length

  return function(...args) {
    // 索引
    let index = 0
    // 判断是否有传入函数 没有函数 直接返回参数
    let result = length ? fns[index].apply(this, args) : args
    while (++index < length) {
      // 依次调用函数，将结果传入给下一个函数
      result = fns[index].call(this, result)
    }
    return result
  }
}

function sum(x, y, z) {
  return x + y + z
}

const curriedSum = currying(sum)

console.log(curriedSum(1))
console.log(curriedSum(1)(2)(3))
console.log(curriedSum(1, 2, 3))

const obj = {
  foo(x) {
    this.x = x
    return x + x
  },
  bar(y) {
    this.y = y
    return y * y
  }
}

const baz = composeFn(obj.foo, obj.bar).bind(obj)
const result = baz(10)
console.log(obj, result) 
console.log(composeFn()(10))



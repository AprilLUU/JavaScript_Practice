function myCurrying(fn) {

  function curried(...args) {
    // 判断参数个数与原有参数个数是否一致
    if (args.length >= fn.length) {
      // 调用原有函数，传入this和参数
      return fn.apply(this, args)
    } else {
      // 个数不一致时，返回一个函数，该函数会继续调用curried
      // function curried2(...args2) {
      //   // 将两次的参数拼接，继续检查参数个数
      //   return curried.apply(this, [...args, ...args2])
      // }
      // return curried2
      /**
       * bind函数会将返回的函数绑定的参数以及实际的参数做一个合并
       */
      return curried.bind(this, ...args) 
    }
  }
  return curried
}

function add(x, y, z) {
  return x + y + z
}

const curryAdd = myCurrying(add)

console.log(curryAdd(10, 20, 30), 
            curryAdd(10, 20)(30),
            curryAdd(10)(20)(30))

function myCurrying(fn) {
  
  function curried(...args) {
    if (args.length >= fn.length) {
      fn.apply(this, args)
    } else {
      return curried.bind(...args)
    }
  }

  return curried
}
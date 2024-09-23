Function.prototype.myCall = function(thisArg, ...args) {
  let fn = this

  if (thisArg !== null && thisArg !== undefined) {
    thisArg = Object(thisArg)
  } else {
    thisArg = window
  }
  
  thisArg.fn = fn
  const result = thisArg.fn(...args)
  delete thisArg.fn

  return result
}

function foo(...args) {
  // console.log(foo.arguments) //实参类数组
  // console.log(foo.arguments.callee) // 函数本身
  // console.log(foo.caller) // 函数的调用者 全局作用域下为null
  console.log(args)
  console.log('foo')
}

foo.myCall({}, 20, 30, 40)


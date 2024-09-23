function foo() {
  console.log(arguments)
  console.log(arguments.length)
  console.log(arguments[0])
  console.log(arguments.callee)
  console.log(arguments.callee.caller)
  console.log(foo.caller)
  let newArr = []
  for (let i = 0; i < arguments.length; i++) {
    newArr.push(arguments[i])
  }
  const newArr2 = Array.from(arguments)
  const newArr3 = [].slice.call(arguments)
  const newArr4 = [...arguments]
}

Array.prototype.mySlice = function(start = 0, end) {
  let arr = this
  end = end || arr.length
  let newArr = []
  for (let i = start; i < end; i++) {
    newArr.push(arr[i])
  }
  return newArr
}

foo(10, 20, 30)
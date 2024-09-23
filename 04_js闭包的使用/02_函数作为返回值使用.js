function makeAdder(count) {
  return function(num) {
    return count + num
  }
}

var add5 = makeAdder(5)
add5(10)

//高阶函数： 接收一个函数作为参数，或者返回值为一个函数的函数，就是高阶函数

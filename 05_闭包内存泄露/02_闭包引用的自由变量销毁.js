function foo() {
  var name = 'why'
  var age = 18 // V8引擎会进行优化，删除AO对象上没引用的属性

  return function() {
    debugger
    console.log(name)
  }
}

var fn = foo()
fn()

/**
 * 重新运行函数，代码重新编译，创建一个新的函数执行上下文以及一个新的AO对象，函数体重新执行
 */
var fn1 = foo()
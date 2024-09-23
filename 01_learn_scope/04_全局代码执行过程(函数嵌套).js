var age = 100

foo(123)

/**
 * 1. 在函数里面有内嵌函数时，在解析阶段不会进行解析，会进行预解析
 * 2. foo函数执行时, 创建AO对象
 * 3. bar函数进行解析，创建一边内存空间保存bar函数对象
 * 4. AO对象保存参数信息以及bar函数引用等
 * 5. bar函数执行，创建新的函数执行上下文，入栈执行上下文栈，创建VO 以及 scope chain
 */

function foo(n) {
  console.log(m)
  var m = 5
  
  function bar() {
    console.log(age) // 沿着作用域链，查找barAO对象，再查找fooAO对象，再查找GO对象 100
    console.log('bar')
  }

  bar()
}
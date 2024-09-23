// 'use strict'
// function foo() {
//   console.log(this)
// }
// foo()
/**
 * this的绑定是动态绑定的 与定义位置都没关系 调用时才会绑定一个this 因为this是绑定到执行上下文中的
 * 执行上下文栈中的每一个执行上下文都会有一个this记录
 * 全局上下文中的this记录是Global Object(window)
 * node环境下是{}(源码里通过call绑定了this)
 * node执行规则把每一个文件都当成module
 * module -> 加载 -> 编译 -> 放到一个函数作用域去执行 -> 把这个函数的执行上下文的this绑定为 {}
 */
console.log(this) //Global Object
console.log(window) //Global Object
var name = 'why'
var num1 = 20

/**
 * 
 *  1. 解析(编译)阶段遇到函数声明，会在堆内存创建一块空间用以保存函数对象，然后在GO对象上保存该函数引用
 *     GO = { foo: 0xa00 } 0xa00 = { [[scope]]: 指向父级作用域, body: 函数的执行体}
 *  2. 运行代码时，遇到函数调用,创建一个AO(Activation Object)对象，用以保存参数信息以及变量声明等(类似GO)
 *     AO = { n: undefined, m: undefined }
 *  3.创建一个FEC(Functional Execution Context)函数执行上下文，入栈ECS(执行上下文栈)
 *  4. 创建VO对象，指向AO以及scope chain(AO + 指向父作用域的Parent Scope),执行函数体
 *  5. 查找变量的规则，沿着作用域链去查找，直到找到全局作用域为止
 *  5. 函数执行完毕，函数执行上下文出栈销毁，AO对象销毁
 */
foo(123)

function foo(n) {
  console.log(m) //从VO对象查找，找到AO上的m属性 undefined
  var m = 5 //从VO对象查找，找到AO上的m属性 赋值为5
  // var name = 'foo' 
  console.log(name) // 从VO对象查找，查找不到，去父级作用域查找(GO)，查找到GO的name属性 why
  console.log('foo')
}

foo(456)

console.log(window) //GlobaleObject

// var GlobaleObject = {
//   foo: function(...args) {...}
// }
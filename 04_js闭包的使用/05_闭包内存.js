/**
 * 闭包定义: 一个函数引用了外层作用域（外层词法环境）的变量，就称之为闭包
 */

/**
 * 1. 解析阶段，在堆内存创建GO对象，保存内建类，变量，函数等
 *    1.1 遇到函数声明，创建函数对象，确定该函数的父级作用域，在GO对象保存该函数对象的引用
 *    1.2 遇到未使用的函数声明(函数声明里又声明另一个函数)，进行预解析
 *    1.3 遇到变量声明，保存变量，赋值为undefined
 *    0x100 = GO = { String, setTimeout, ..., foo: 0xa00, fn: undefined }
 *    0xa00 = fooFunObj = { parentScope: 0x100GO, body}
 * 2. 运行代码，创建全局执行上下文(GEC)，入栈执行上下文调用栈(ECS)
 * 3. 创建AO对象(foo), 保存其内的变量和函数
 *    0x200 = fooAO = { name: undefined, age: undefined, bar: 0xb00 }
 *    父级作用域是在函数声明时确定的
 *    0xb00 = barFunObj = { parentScope: 0x200fooAO, body}
 * 4. 创建FEC(foo函数执行上下文)，入栈
 * 5. 在fooFEC中创建VO对象，指向AO对象
 *    fooVO = AO
 * 6. 在fooFEC中创建作用域链
 *    scopeChain = fooAO + GO
 * 7. 执行函数体
 *    fooAO = { name: why, age: 18, bar: 0xb00 }
 *    GO = { String, setTimeout, ..., foo: 0xa00, fn: 0xb00 }
 * 8. fooFEC出栈销毁(AO对象视情况而定是否销毁，内存管理)
 *    fooAO对象被bar函数对象的parentScope引用着不会销毁
 * 9. 创建AO对象(bar), 保存其内的变量和函数
 *    0x300 = barAO = {}
 * 10. 创建FEC(bar函数执行上下文)，入栈
 * 11. 在barFEC中创建VO对象，指向AO对象
 *     barVO = AO
 * 12. 在barFEC中创建作用域链
 *     scopeChain = barAO + fooAO + GO
 * 13. 执行函数体, 通过作用域链进行查找，打印name和age
 * 14. barFEC出栈销毁，barAO失去任何引用销毁
 * 15. 最后内存剩下
 *    0x100 = GO = { String, setTimeout, ..., foo: 0xa00, fn: 0xb00 }
 *    0x200 = fooAO = { name: why, age: 18, bar: 0xb00 }
 *    0xa00 = fooFunObj = { parentScope: 0x100GO, body}
 *    0xb00 = barFunObj = { parentScope: 0x200fooAO, body}
 */    

function foo() {
  var name = 'why'
  var age = 18

  function bar() {
    console.log(name, age)
  }

  return bar
}

var fn = foo()

fn()

/**
 * 内存泄漏：该释放的内存没有释放，就是内存泄漏
 */
fn = null // bar函数对象失去引用，释放，fooAO对象失去引用，释放
foo = null // foo函数对象失去引用，释放

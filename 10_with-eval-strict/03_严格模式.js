'use strict'

/**
 *  开启严格模式之后 一些允许的静默错误都会被抛出异常
 */

// 1.禁止意外地创建全局变量
message = 'hello world'
console.log(message)

function foo() {
  age = 20
}

//2.不允许函数有相同的参数名称
function bar(x, y, x) {
  console.log(x, y, x)
}

bar(10, 20, 30)

//3.静默错误
true.foo = 'foo'
NaN = 123

const obj = {}
Object.defineProperty(obj, 'name', {
  configurable: false,
  writable: false,
  value: 'why'
})
obj.name = 'kobe'
delete obj.name

//4.不允许使用原先的八进制格式 0123
let num = 0o123 // 八进制
var num1 = 0x123 //十六进制
let num2 = 0b100 // 二进制

// 5.with语句不允许使用

// 6.eval函数不会向上引用变量了
//eval执行环境默认在当前的作用域下执行，开启严格模式在eval拥有自己的作用域，在自己的作用域中执行
let jsString = 'var message = "hello world"'
eval(jsString)
console.log(message)

// 7.严格模式下全局this指向undefined
function foo1() {
  console.log(this)
}

var obj = {
  foo: foo1
}

foo1() //undefined
// 为确保 user.hi() 调用正常运行，JavaScript 玩了个小把戏 —— 点 '.' 返回的不是一个函数，而是一个特殊的 Reference Type 的值。
// 进行其他操作例如赋值 逻辑运算时会将这个ReferenceType丢弃 只保留值进行传递
obj.foo() //obj
let foo2 = obj.foo() 
foo2() // undefined Reference Type

setTimeout(function() {
  console.log(this) //严格与非严格模式下 都是指向window 内部源码 fn.apply(window)
}, 0)

class Person {

}
/**
 * class实现JS继承语法糖
 * 通过 class 创建的函数具有特殊的内部属性标记 [[IsClassConstructor]]: true
 * JS引擎会在许多地方检查该属性。例如，与普通函数不同，必须使用 new 来调用它
 * 类方法不可枚举。 类定义将 "prototype" 中的所有方法的 enumerable 标志设置为 false。
 */


// 类的表达式
// let Person = class {}
//类似于命名函数表达式（Named Function Expressions），类表达式可能也应该有一个名字。
//如果类表达式有名字，那么该名字仅在类内部可见:
let User = class MyClassName {
  constructor() {
    console.log(MyClassName) // class {...}
  }
}

console.log(MyClassName) // Error: 外部不可见

console.log(Person, Person.prototype)
console.log(Person.prototype.__proto__)// 顶层原型
console.log(Person.prototype.constructor) // [class Person]
console.log(typeof Person) // function

const p = new Person()

console.log(p.__proto__ === Person.prototype) // true
/**
 * 通过obj.xxx()执行时会将这个函数的执行上下文中的this绑定为.操作符前面的对象obj
 * 通过·操作符读取的是一个Reference Type(obj, key, value)
 * 进行赋值等其他操作时只会取值value进行传递
 * 例如 let bar = obj.foo  (isFun ? obj.foo : obj.bar)()
 */

function foo() {
  console.log(this)
}

var obj = { foo }

obj.foo()

var obj1 = {
  eating() {
    console.log(this)
  }
}

obj1.eating()
let fn = obj1.eating
fn()
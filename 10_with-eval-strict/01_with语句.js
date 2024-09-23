// 'use strict' 严格模式下不能使用with语句

var obj = {
  name: 'why',
  age: 18
}

var message = 'hello world'

function foo() {
  /**
   * with语句会形成自己的作用域
   * 使用with语句会传入一个对象
   * 在with语句里面使用变量，会先在传入的对象中查找对应的属性
   * 找不到再沿着作用域链往上查找
   */
  with(obj) {
    console.log(name) // why
    console.log(message) // hello world
  }
}

var info = { name: 'kobe' }
with(info) {
  console.log(name) //kobe
}
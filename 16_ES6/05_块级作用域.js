/**
 * 1. 每一个代码块中在执行过程中都会有一个上下文，上下文中关联着一个变量环境
 *  1.1 在这个代码块中(let/const)声明的变量,class等都会作为一条记录添加到变量环境中
 *  1.2 var声明的变量以及function声明的函数，不会添加到块级作用域中，而是添加到父级作用域中(兼容ES5之前的代码运行)
 *  1.3 全局变量环境不等于window，但是var和function声明的变量和函数仍会添加到window中(兼容ES5之前的代码运行)
 *  1.4 全局变量环境是一个哈表表，用以添加和查找环境记录
 */

{
  let foo = 'foo'
  var bar = 'bar'
  function demo() {}
  class Person {}
}

console.log(bar)
demo()
const p = new Person()

if (true) {
  let foo = 'foo'
}

for (let i = 0; i < 10; i++) {
  console.log(i)
}

let color = 'red'

switch(color) {
  case 'red' :
    let foo = 'foo'
}

while (true) {
  let foo = 'foo'
}
/**
 * 函数默认执行时会把执行上下文中的this绑定为Global Object
 * 严格模式下会把执行上下文中的this绑定为undefined
 */


function foo() {
  console.log(this) // undefined
}

foo()

function foo1() {
  console.log(this) // undefined
}

function foo2() {
  console.log(this)// undefined
  foo1()
}

function foo3() {
  console.log(this)// undefined
  foo2()
}

var obj = {
  foo() {
    console.log(this)
  }
}

var bar = foo
bar()// undefined

function foo() {
  function bar() {
    console.log(this) 
  }

  return bar
}

var fn = foo()
fn()// undefined
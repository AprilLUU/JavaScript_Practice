// 默认绑定 < 隐式绑定 < 显式绑定(bind > call&apply) < new绑定  

var obj = {
  name: 'obj',
  foo() {
    console.log(this)
  }
}

obj.foo() // obj
obj.foo.call({}) // {}

var obj1 = {
  foo: obj.foo.bind({})
}

obj1.foo() // {}

function foo() {
  console.log(this)
}

const bar = foo.bind({ type: 'bind' })
console.log(bar == foo)
foo.bind({ type: 'bind'}).call({ type: 'call' })
const p = new bar()
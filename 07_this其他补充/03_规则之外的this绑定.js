'use strict'

/**
 * 显示绑定this为null以及undefined时，在非严格模式下是GO，严格模式仍是绑定的nul/undefined
 */

function foo() {
  console.log(this)
}

foo.call(null)
foo.apply(undefined)

foo.bind(null)()

const obj = {
  foo() {
    console.log(this)
  }
}

const obj1 = {}

// obj1.bar = obj.foo
// obj1.bar()
;(obj1.bar = obj.foo)()

;[1, 2, 3].forEach(item => console.log(item))
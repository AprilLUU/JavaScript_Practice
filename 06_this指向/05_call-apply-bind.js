// 'use strict'

function foo(...args) {
  console.log(args, typeof args)
  console.log(this)
}

foo()
foo.call({ type: 'call' }, 10, 20)
foo.apply({ type: 'apply' }, [10, 20])
const bar = foo.bind({ type: 'bind' })
bar(10, 20)
console.log(bar === foo)
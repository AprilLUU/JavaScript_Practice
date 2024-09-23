function foo(...args) {
  console.log(args)
}

const fooProxy = new Proxy(foo, {
  apply(target, thisArg, argArray) {
    return target.apply(thisArg, argArray)
  },
  construct(target, argArray, newTarget) {
    console.log(newTarget === target)
    newTarget(...argArray) // 对原来函数对象的拷贝
    return new target(...argArray)
  }
})

fooProxy.apply({}, ['abc', 'cba'])
new fooProxy('abc', 'cba')
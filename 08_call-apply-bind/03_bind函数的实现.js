Function.prototype.myBind = function(thisArg, ...argArray) {
  let fn = this

  if (thisArg !== null && thisArg !== undefined) {
    thisArg = Object(thisArg)
  } else {
    thisArg = window
  }

  function proxyFn(...args) {
    thisArg.fn = fn
    const finalArgs = [...argArray, ...args]
    const result = thisArg.fn(...finalArgs)
    delete thisArg.fn
    return result
  }

  return proxyFn
}

function foo(...args) {
  console.log(args)
  console.log('foo')
}

const bar = foo.myBind({ type: 'bind' }, 10, 20, 30)
bar(40,50)
console.log(bar)

const systemBar = foo.bind({ type: 'bind' })
systemBar()
console.log(systemBar)
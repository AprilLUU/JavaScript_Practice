Function.prototype.myCall = function(thisArg, ...args) {
  let fn = this

  if (thisArg !== null && thisArg !== undefined) {
    thisArg = Object(thisArg)
  } else {
    thisArg = globalThis
  }

  const s = Symbol("fn")
  thisArg[s] = fn
  const result = thisArg[s](...args)
  delete thisArg[s]

  return result
}

Function.prototype.myApply = function(thisArg, argArray) {
  let fn = this

  if (thisArg !== null && thisArg !== undefined) {
    thisArg = Object(thisArg)
  } else {
    thisArg = globalThis
  }

  const s = Symbol("fn")
  thisArg[s] = fn
  argArray = argArray || []
  const result = thisArg[s](...argArray)
  delete thisArg.fn

  return result
}

Function.prototype.myBind = function(thisArg, ...args1) {
  let fn = this

  if (thisArg !== null && thisArg !== undefined) {
    thisArg = Object(thisArg)
  } else {
    thisArg = globalThis
  }

  function proxyFn(...args2) {
    const s = Symbol("fn") 
    thisArg[s] = fn
    const finalArgs = [...args1, ...args2]
    const result = thisArg[s](...finalArgs)
    return result
  }

  return proxyFn
}

function foo(...args) {
  console.log(this)
  console.log(...args)
  console.log("foo")
}

foo.myCall({ type: "call" }, 1, 2, 3, 4)
foo.myApply({ type: "apply" }, [1, 2, 3, 4])
foo.myBind({ type: "bind" }, 1, 2)(3, 4)

foo.myCall(null)
foo.myCall()

const bar = foo.bind({})
const b = new bar()
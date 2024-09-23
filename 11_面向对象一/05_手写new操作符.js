function createObject(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new TypeError('constructor must be function type')
  }
  const newObj = Object.create(constructor.prototype)
  const result = constructor.apply(newObj, args)
  const isObj = result && (typeof result === 'object' || typeof result === 'function')
  return isObj ? result : newObj
}

Function.prototype.MyCall = function(thisArg, ...args) {
  let fn = this

  if (thisArg !== null && thisArg !== undefined) {
    thisArg = Object(thisArg)
  } else {
    thisArg = window
  }
  
  thisArg.fn = fn
  const result = thisArg.fn(...args)
  delete thisArg.fn
  return result
}
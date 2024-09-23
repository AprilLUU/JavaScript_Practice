Function.prototype.myApply = function(thisArg, argArray) {
  let fn = this

  if (thisArg !== null && thisArg !== undefined) {
    thisArg = Object(thisArg)
  } else {
    thisArg = window
  }
  
  thisArg.fn = fn
  const argArray = argArray || []
  const result = thisArg.fn(...argArray)
  delete thisArg.fn
  
  return result
}
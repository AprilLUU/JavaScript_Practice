/**
 *  let newObj = {}
 *  newObj.__proto__ = Object.prototype
 *  this = newObj
 *  执行function Object() {...}
 *  return this
 */

const obj = {}
const obj1 = new Object()

console.log(Object.getPrototypeOf(obj))
console.log(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(obj)))
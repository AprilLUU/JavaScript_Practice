let obj = {
  name: 'why',
  age: 18
}
/**
 * Object.create(obj)
 * 创建一个对象，其原型对象是传入的对象
 * @param {object} o 指定的原型对象
 * @returns {object} newObj 带有指定原型对象的对象
 */
function createObject(o) {
  let newObj = {}
  Object.setPrototypeOf(newObj, o)
  return newObj
}

function createObject2(o) {
  function Fn() {}
  Fn.prototype = o
  let newObj = new Fn()
  return newObj
}

let info = createObject(obj)
let info1 = Object.create(obj)

console.log(info)
console.log(info.__proto__)
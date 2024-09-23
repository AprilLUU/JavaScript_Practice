function isObj(value) {
  const valueType = typeof value
  return value && (valueType === "function" || valueType === "object")
}


function createObj(constructor, ...args) {
  const obj = Object.create(constructor.prototype)
  const result = constructor.apply(obj, args)
  const isObjType = isObj(result)
  return isObjType ? result : obj
}

function isInstacne(sub, sup) {
  let subProto = Object.getPrototypeOf(sub)

  if (subProto === null) {
    return false
  }

  if (subProto.constructor === sup) {
    return true
  } else {
    return isInstacne(subProto)
  }
}

function isInstacne2(sub, sup) {
  let subProto = Object.getPrototypeOf(sub)
  
  while (subProto !== null) {
    subProto = Object.getPrototypeOf(subProto)
    if (subProto.constructor === sup) {
      return true
    }
  }

  return false
}

function foo(msg) {
  this.msg = msg
  // return {
  //   msg: "otherObj"
  // }
}

const fooObj = createObj(foo, "test")
const fooObjProto = Object.getPrototypeOf(fooObj)
const isFoo = isInstacne(fooObj, foo)
// console.log(fooObjProto, fooObjProto === foo.prototype)
// console.log(fooObj, isFoo) // foo { msg: "test"},  true
console.log(isInstacne({}, foo))
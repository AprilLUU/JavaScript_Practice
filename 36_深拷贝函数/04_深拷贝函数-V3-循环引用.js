function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === 'object' || valueType === 'function')
}
 
function deepClone(originValue, map = new WeakMap()) {
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  if (typeof originValue === 'function') {
    return originValue
  }

  if (!isObject(originValue)) {
    return originValue
  }

  if (map.has(originValue)) {
    return map.get(originValue)
  }

  const newObj = Array.isArray(originValue) ? [] : {}
  map.set(originValue, newObj)
  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key], map)
  }

  const sKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of sKeys) {
    newObj[skey] = deepClone(originValue[skey], map)
  }

  return newObj
}

const s1 = Symbol('aaa')
const s2 = Symbol('bbb')

const obj = {
  name: 'why',
  friend: {
    name: 'kobe'
  },
  hobbies: ['篮球', '足球'],
  foo() {},
  [s1]: 'abc',
  s2: s2,
  set: new Set([111, 222, 333]),
  map: new Map([111, 222, 333]),
  info: obj
}

const newObj = deepClone(obj)
console.log(newObj.friend === obj.friend)
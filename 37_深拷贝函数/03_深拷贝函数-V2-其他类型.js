function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originVaue) {
  if (originVaue instanceof Set) {
    return new Set([...originVaue])
  }

  if (originVaue instanceof Map) {
    return new Map([...originVaue])
  }

  if (typeof originVaue === 'symbol') {
    return Symbol(originVaue.description)
  }

  if (typeof originVaue === 'function') {
    return originVaue
  }

  if (!isObject(originVaue)) {
    return originVaue
  }

  const newObj = Array.isArray(originVaue) ? [] : {}
  for (const key in originVaue) {
    newObj[key] = deepClone(originVaue[key])
  }

  const sKeys = Object.getOwnPropertySymbols(originVaue)
  for (const sKey of sKeys) {
    newObj[skey] = deepClone(originVaue[skey])
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
  map: new Map([111, 222, 333])
}

const newObj = deepClone(obj)
console.log(newObj.friend === obj.friend)
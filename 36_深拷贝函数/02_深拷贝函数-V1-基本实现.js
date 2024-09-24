function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originVaue) {
  if (!isObject(originVaue)) {
    return originVaue
  }

  const newObj = {}
  for (const key in originVaue) {
    newObj[key] = deepClone(originVaue[key])
  }

  return newObj
}

const obj = {
  name: 'why',
  friend: {
    name: 'kobe'
  }
}

const newObj = deepClone(obj)
console.log(newObj.friend === obj.friend)
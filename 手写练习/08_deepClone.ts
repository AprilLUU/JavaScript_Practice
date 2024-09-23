function isObj(value: any) {
  const valueType = typeof value
  return value && (valueType === "function" || valueType === "object")
}

function deepClone(originValue: any, map = new WeakMap()) {
  if (!isObj(originValue)) {
    return originValue
  }

  if (typeof originValue === "symbol") {
    return Symbol(originValue.description)
  }

  if (typeof originValue === "function") {
    return originValue
  }

  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  if (map.has(originValue)) {
    return map.get(originValue)
  }

  let cloneObj = Array.isArray(originValue) ?  [] :  {}
  map.set(originValue, cloneObj)

  for (const key in originValue) {
    cloneObj[key] === deepClone(originValue[key], map)
  }

  const sKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of sKeys) {
    cloneObj[sKey] = deepClone(originValue[sKey], map)
  }

  return cloneObj
}
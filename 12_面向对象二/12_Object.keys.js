const obj = {
  name: 'why',
  firend: {
    name: 'kobe'
  }
}

Object.defineProperty(obj, 'age', {
  value: 18
})

const obj1 = {
  address: 'gz'
}

Object.setPrototypeOf(obj, obj1)

/**
 * 只会返回自身对象身上的可枚举属性(不包括Symbol)
 * 会忽略继承的属性
 */
const keys = Object.keys(obj)
const values = Object.values(obj)
const entries = Object.entries(obj)
const obj2 = Object.fromEntries(entries)

console.log(keys, values, entries, obj2)
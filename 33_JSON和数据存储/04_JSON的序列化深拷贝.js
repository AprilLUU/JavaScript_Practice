const obj = {
  name: 'why',
  age: 18,
  friend: {
    name: 'kobe',
    age: 20
  }
}

// 浅拷贝
const info1 = { ...obj }
const info2 = Object.assign({}, obj)
const info3 = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))

// 深拷贝
/**
 * undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）
 * 或者被转换成 null（出现在数组中时）。
 * 函数、undefined 被单独转换时，会返回 undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 */
const info4 = JSON.parse(JSON.stringify(obj))


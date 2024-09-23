let obj = {
  name: 'why',
  age: 18
}

//禁止对象添加新的属性
Object.preventExtensions(obj)

obj.height = 1.88

//禁止对象添加/删除属性(configurable: false)
Object.seal(obj)

for (const key in obj) {
  Object.definePropery(obj, key, {
    configurable: false
  })
}

//让属性不可以修改(configurable: false, writable: false)
Object.freeze(obj)

for (const key in obj) {
  Object.definePropery(obj, key, {
    writable: false
  })
}
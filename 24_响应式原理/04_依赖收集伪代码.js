const obj = {
  name: 'why',
  age: 18
}

const info = {
  address: 'gz'
}

// 通过Map来管理每个对象的属性的依赖
const objMap = new Map()
objMap.set('name', 'name depend')
objMap.set('age', 'age depend')

const infoMap = new Map()
infoMap.set('address', 'address depend')

//通过WeakMap来收集每个对象的map结构
const targetMap = new WeakMap()
targetMap.set(obj, objMap)
targetMap.set(info, infoMap)

const objNameDepend = targetMap.get(obj).get('name')
const infoAddressDepend = targetMap.get(info).get('address')


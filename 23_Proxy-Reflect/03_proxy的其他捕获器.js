const obj = {
  name: 'why',
  age: 18
}

//会修改原始对象的属性描述符
Object.defineProperty()

const proxy = new Proxy(obj, {
  get(target, key) {
    return target[key]
  },
  set(target, key, newValue) {
    target[key] = newValue
  },
  // key in proxy (监听in操作符)
  // 不能监听for in 遍历
  has(target, key) {
    console.log(key)
    return key in target
  },
  // delete proxy.key
  deleteProperty(target, key) {
    console.log(key)
    delete target[key]
  },
  // Object.getPrototypeOf()
  getPrototypeOf(target) {
    return Object.getPrototypeOf(target)
  },
  //Object.setPrototypeOf()
  setPrototypeOf(target,targetProto) {
    Object.setPrototypeOf(target, targetProto)
  },
  isExtensible(target) {
    return Object.isExtensible(target)
  },
  preventExtensions(target) {
    Object.preventExtensions(target)
  },
  getOwnPropertyDescriptor(target, key) {
    return Object.getOwnPropertyDescriptor(target, key)
  },
  defineProperty(target, key, descriptors) {
    Object.defineProperty(target, key, descriptors)
  },
  ownKeys(target) {
    //return Object.getOwnPropertySymbols(target)
    return Object.getOwnPropertyNames(target)
  },
})

for (const key in proxy) {
  console.log(key)
}

console.log('name' in proxy)

const obj = {
  name: 'why',
  age: 18
}

// 当没有定义捕获器时，会将所有操作转发给原对象
const proxy = new Proxy(obj, {
  get(target, key) {
    return target[key]
  },
  set(target, key, newValue) {
    target[key] = newValue
  }
})

console.log(proxy.name)
console.log(proxy.age)

proxy.name = 'coderwhy'

console.log(obj.name)
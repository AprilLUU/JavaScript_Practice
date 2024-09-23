const obj = {
  name: 'why',
  age: 18
}

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set(target, key, newValue, receiver) {
    return Reflect.set(target, key, newValue, receiver)
  }
})
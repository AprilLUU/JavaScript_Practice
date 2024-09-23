function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, recevier) {
      return Reflect.get(target, key, recevier)
    },
    set(target, key, newValue, recevier) {
      console.log(newValue)
      return Reflect.set(target, key, newValue, recevier)
    }
  })
}

const obj1 = {
  name: 'why',
  age: 18
}

const obj2 = reactive(obj1)
const obj3 = { ...obj2 }
console.log(obj3)
const obj4 = reactive(obj3)
obj2.name = "kobe"
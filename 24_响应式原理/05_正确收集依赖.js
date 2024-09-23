class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    this.reactiveFns.push(fn)
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

let activeReactiveFn = null
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

const targetMap = new WeakMap()
function getDepend(target, key) {
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }

  return depend
}

const obj = {
  name: 'why',
  age: 18
}

const objProxy = new Proxy(obj, {
  get(target, key, recevier) {
    const depend = getDepend(target, key)
    depend.addDepend(activeReactiveFn)
    return Reflect.get(target, key, recevier)
  },
  set(target, key, newValue, recevier) {
    Reflect.set(target, key, newValue, recevier)
    const depend = getDepend(target, key)
    depend.notify()
  }
})

watchFn(() => {
  console.log(objProxy.name)
})

watchFn(() => {
  console.log(objProxy.age)
})

watchFn(() => {
  console.log(objProxy.name)
  console.log(objProxy.age) // 又执行了get 添加了null
})

objProxy.name = 'kobe'
objProxy.age = 20

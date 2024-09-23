class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    this.reactiveFns.push(fn)
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

function watchFn(fn) {
  dep.addDepend(fn)
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
    return Reflect.get(target, key, recevier)
  },
  set(target, key, newValue, recevier) {
    Reflect.set(target, key, newValue, recevier)
    const depend = getDepend(target, key)
    depend.notify()
  }
})

watchFn(() => {
  console.log('name1')
})
watchFn(() => {
  console.log('name2')
})

objProxy.name = 'kobe'
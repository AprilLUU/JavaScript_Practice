let activeReactiveFn = null
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    this.reactiveFns.add(fn)
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

const weakMap = new WeakMap()
function getDepend(target, key) {
  let map = weakMap.get(target)
  if (!map) {
    map = new Map()
    weakMap.set(target, map)
  }

  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }

  return depend
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, recevier) {
      const depend = getDepend(target, key)
      depend.depend()
      return Reflect.get(target, key, recevier)
    },
    set(target, key, newValue, recevier) {
      Reflect.set(target, key, newValue, recevier)
      const depend = getDepend(target, key)
      depend.notify()
    }
  })
}

function watchEffect(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

function watch(target, key, fn, options = { immediate : false }) {
  activeReactiveFn = fn
  let value = target[key]
  if (options.immediate) {
    fn()
  }
  value = null
  activeReactiveFn = null
}

const obj = reactive({
  name: 'why',
  age: 18
})

const obj1 = reactive({
  address: 'gz'
})

watch(obj, 'name', () => {
  console.log('name change')
})
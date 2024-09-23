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
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


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

let obj = {
  name: 'why'
}

let objProxy = reactive(obj)

const obj1 = reactive({
  name: 'kobe'
})

// watchFn(() => {
//   console.log(obj.name)
// })

// watchFn(() => {
//   console.log(obj1.name)
// })

// watchFn(() => {
//   console.log(obj.name)
//   console.log(obj1.name)
// })

// obj.name = 'coderwhy'
// obj1.name = 'james'

const finalRegistry = new FinalizationRegistry(value => {
  console.log(`${value}对象即将销毁`)
})

finalRegistry.register(obj, 'obj')
obj = null
objProxy = null
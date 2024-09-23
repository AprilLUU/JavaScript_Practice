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

const dep = new Depend()

function watchFn(fn) {
  dep.addDepend(fn)
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
    dep.notify()
  }
})

watchFn(() => {
  console.log('name1')
})
watchFn(() => {
  console.log('name2')
})

objProxy.name = 'kobe'

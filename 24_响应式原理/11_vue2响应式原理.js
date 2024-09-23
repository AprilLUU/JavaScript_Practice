function reactive(obj, key) {
  const dep = new Dep()
  let _value = obj[key]

  Object.defineProperty(obj, key, {
    get() {
      dep.depend()
      return _value
    },
    set(newValue) {
      _value = newValue
      dep.notify()
    }
  })
}

class Observer {
  constructor(obj) {
    const keys = Object.keys(obj)
    keys.forEach((key) => {
      reactive(obj, key)
    })
  }
}

class Dep {
  static target = null

  constructor() {
    this.subs = []
  }

  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target)
    }
  }

  addDep(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

class Wacther {
  constructor(fn) {
    this.effect = fn
    this.get()
  }

  get() {
    Dep.target = this
    this.effect()
    Dep.target = null
  }

  update() {
    this.effect()
  }
}

function observe(obj) {
  const ob = new Observer(obj)
  return ob
}

const obj = {
  name: "lry"
}

observe(obj)

new Wacther(() => {
  console.log(obj.name)
})

obj.name = "zzy"
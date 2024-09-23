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

const obj = {
  name: 'why',
  age: 18
}

const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
}
watchFn(() => {
  console.log('name1')
})
watchFn(() => {
  console.log('name2')
})
obj.name = 'kobe'
dep.notify()
const finalRegistry = new FinalizationRegistry(value => {
  console.log(`注册在finalizationRegistry上的${value}对象，即将被销毁`)
})

let obj = { name: 'why' }
let obj1 = {}

finalRegistry.register(obj, 'obj')

let map = new WeakMap()
// map.set(obj1, obj)
map.set(obj, "obj")
setTimeout(() => {
  console.log(map.get(obj))
}, 1000)

// const map = new Map()
// map.set(obj, 'obj')

// const wm = new WeakMap()
// wm.set(obj, 'obj')

obj = null
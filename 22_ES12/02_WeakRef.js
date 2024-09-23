const finalRegistry = new FinalizationRegistry(value => {
  console.log(`注册在finalizationRegistry上的${value}对象，即将被销毁`)
})

let obj = { name: 'why' }
// let info = obj
let info = new WeakRef(obj)

// 如果原对象没有销毁，获取到原对象
// 如果已经销毁，则是undefined
console.log(info.deref())
console.log(info)

finalRegistry.register(obj, 'obj')

obj = null

setTimeout(() => {
  console.log(info.deref()?.name)
  console.log(info.deref() && info.deref().name)
}, 10000)
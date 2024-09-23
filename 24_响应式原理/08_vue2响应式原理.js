let activeReactiveFn = null

class Depend {
  constructor() {
    // 依赖集合
    // Set可以保证收集同一个响应函数里多个依赖时，只保存一次该响应函数
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    this.reactiveFns.add(fn)
  }

  depend() {
    // 判断当前活跃函数是否需要收集
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

/**
 * 
 * @param {function} fn 带有指定依赖的函数 
 */
function watchFn(fn) {
  // 1. 当前活跃的函数赋值为传入的函数
  activeReactiveFn = fn
  // 2. 运行该函数，收集依赖(对应的属性getter中去收集)
  fn()
  // 3. 依赖收集结束，活跃函数赋值为null
  activeReactiveFn = null
}

// weakMap 存储对象及其属性映射表 <obj, objMap>
// 选择weakMap，当不想使用obj对象时，可以将其代理致为空，GC会将obj及objMap都回收(弱引用)
const targetMap = new WeakMap()
/**
 * 
 * @param {object} target 获取属性映射表的对象
 * @param {string | symbol} key 获取对该对象属性的依赖集合
 * @returns Depend对象
 */
function getDepend(target, key) {
  // 1. 获取映射表
  let map = targetMap.get(target)
  if (!map) {
    // 2. 第一次获取时，映射表不存在，新建映射表并保存
    map = new Map()
    targetMap.set(target, map)
  }

  let depend = map.get(key)
  if (!depend) {
    // 3. 第一次获取时，属性依赖不存在，新建依赖对象并保存
    depend = new Depend()
    map.set(key, depend)
  }
  // 4. 返回依赖对象
  return depend
}

function reactive(obj) {
  Object.keys(obj).forEach(key => {
    let _value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        const depend = getDepend(obj, key)
        depend.depend()
        return _value
      },
      set(newValue) {
        _value = newValue
        const depend = getDepend(obj, key)
        depend.notify()
      }
    })
  })

  return obj
}

const obj = reactive({
  name: 'why'
})

const obj1 = reactive({
  name: 'kobe'
})

watchFn(() => {
  console.log(obj.name)
})

watchFn(() => {
  console.log(obj1.name)
})

watchFn(() => {
  console.log(obj.name)
  console.log(obj1.name)
})

obj.name = 'coderwhy'
obj1.name = 'james'
const ws = new WeakSet()
const set = new Set()

// 与Set的区别
// 1. 只能存放对象类型 
ws.add(10)

// 2. 对对象是弱引用 weak reference
// 弱引用的概念：GC在回收内存的时候不会根据这个引用决定是否回收，只要其他地方没有引用会直接回收
// storng reference
let obj = {
  name: 'why',
  friend: {
    name: 'kobe'
  }
}

ws.add(obj) // 弱引用
set.add(obj) // 强引用

// 3. WeakSet不能遍历，没有forEach
// 4. WeakSet也没有clear方法

const personSet = new WeakSet()
class Person {
  constructor() {
    personSet.add(this)
  }

  running() {
    if (!personSet.has(this)) {
      throw new Error('不能通过其他对象调用running方法')
    }
    console.log('running', this)
  }
}

const p = new Person()
p.running()
p.running.call({}) // Error: xxxxx

var obj = {
  name: 'why',
  age: 18,
  friend: {
    name: 'kobe'
  }
}

obj['name'] = 'coderwhy' // 会覆盖原来的name属性

//Symbol不能被隐式转换为String，需要调用toString()
const s1 = Symbol()
const s2 = Symbol()

console.log(s1 === s2) // false

const s3 = Symbol('test')
console.log(s3.description)

const obj1 = {
  [s1]: 'test1',
  [s2]: 'test2',
}

obj1[s3] = 'test3'

const s4 = Symbol()

Object.defineProperty(obj4, s4, {
  enumerable: true,
  value: 'test4'
})

// 不能通过obj.s1获取, 通过.语法会去查找对象上的s1属性
console.log(obj1[s1])

console.log(Object.keys(obj1))
console.log(Object.getOwnPropertyNames(obj1))
console.log(Object.getOwnPropertySymbols(obj1))

const obj2 = Object.assign({}, obj1) //会合并所有属性包括Symbol属性

const sa = Symbol.for('aaa')
const sb = Symbol.for('aaa')
console.log(sa === sb)
const key = Symbol.keyFor(sa)
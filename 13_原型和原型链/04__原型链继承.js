function Person(name, age) {
  this.name = name
  this.age = age
  this.firends = []
}

Person.prototype = {
  eating() {
    console.log(this.name + 'eating')
  }
}

Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  // configurable: true,
  // writable: true, 
  value: Person
})

function Student(sno) {
  this.sno = sno
}

Student.prototype = new Person()

Student.prototype.studying = function() {
  console.log(this.name + 'studying')
}

/**
 * 弊端: 
 * 1. 打印子类对象看不到对应的属性
 * 2. 创建的对象共享父类对象的属性(修改原型上的属性会相互影响)
 * 3. 子类构造函数不能传递参数创建自身属性
 */

const stu = new Student(111)
const stu1 = new Student(222)

console.log(stu)
// 直接修改属性 默认会往自身身上加属性 不会去修改原型上的属性 (执行[[Set]])
stu.name = 'why'
//获取引用，修改引用的值会相互影响(执行[[Get]])
stu.firends.push('lisi')

console.log(stu1.name)




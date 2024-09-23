function Person(name, age) {
  this.name = name
  this.age = age
  this.firends = friends
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

function Student(name, age, sno) {
  /**
   * 第一个弊端： Person函数至少被调用两次
   * 第二个弊端: stu的原型对象上会多出来的一些属性， 但是这些属性没有存在的必要
   */
  Person.call(name, age)
  this.sno = sno
}

Student.prototype = new Person()

Student.prototype.studying = function() {
  console.log(this.name + 'studying')
}

const stu = new Student('why', 18, 111)
const stu1 = new Student('kobe', 19, 222)

console.log(stu)
console.log(stu.name)
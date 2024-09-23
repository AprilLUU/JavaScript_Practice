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
  Person.call(name, age)
  this.sno = sno
}

/**
 * 直接将父类原型赋值给子类原型弊端
 * 1. 给子类添加方法相当于添加到父类上了， 其他继承父类的子类也会有对应的方法，但这些方法应该独立存在于自己的类中
 * 2. 没有继承父类的属性，只继承了原型上的方法
 */
Student.prototype = Person.prototype

Student.prototype.studying = function() {
  console.log(this.name + 'studying')
}

const stu = new Student('why', 18, 111)

console.log(stu)

stu.eating()

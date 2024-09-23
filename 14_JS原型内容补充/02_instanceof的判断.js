function inheritPrototype(SubType, SuperType) {
  SubType.prototype = Object.create(SuperType.prototype)

  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true, 
    value: SubType
  })
}

function Person() {

}

function Student() {

}

inheritPrototype(Student, Person)

let stu = new Student()

/**
 * instanceof 会检测该构造函数的原型（prototype)是否出现在该对象的原型链上
 */
console.log(stu instanceof Student) // true
console.log(stu instanceof Person) // true
console.log(stu instanceof Object) // true

console.log(Student.prototype.isPrototypeOf(stu))

let obj = {}
let info = Object.create(obj)

console.log(obj.isPrototypeOf(info))

class Shape {
  /**
   * {}.toString方法会检查this[Symbol.toStringTag]返回的类型
   * 内建类都会有这个属性
   */
  [Symbol.toStringTag] = 'Shape'

  constructor(length) {
    this.length = length
  }
  /**
   * 如果有静态方法Symbol.hasInstance， instanceof会调用该方法，否则会去原型链上查找
   * 覆盖instanceof的默认行为
   */
  static [Symbol.hasInstance]() {
    if (this.length > 10)
      return true
    else 
      return false
  } 
}

const s = new Shape(5)
console.log(s instanceof Shape)
console.log({}.toString.call(s))


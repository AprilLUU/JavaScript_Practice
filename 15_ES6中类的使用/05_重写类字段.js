class Person {
  name = 'person'

  constructor() {
    console.log(this.name)
    this.showName()
  }

  showName() {
    console.log('person')
    console.log(this.name)
  }
} 

class Student extends Person {
  name = 'student'
/** 
  * 在 JavaScript 中，继承类（所谓的“派生构造器”，英文为 “derived constructor”）的构造函数与其他函数之间是有区别的。
  * 派生构造器具有特殊的内部属性 [[ConstructorKind]]:"derived"。
  * 这是一个特殊的内部标签。
  * 该标签会影响它的 new 行为：
  * 当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。
  * 但是当继承的 constructor 执行时，它不会执行此操作。
  * 它期望父类的 constructor 来完成这项工作。
  * 因此，派生的 constructor 必须调用 super 才能执行其父类（base）的 constructor，否则 this指向的那个对象将不会被创建。
  * 实际上，原因在于字段初始化的顺序。类字段是这样初始化的：
  * 对于基类（还未继承任何东西的那种），在构造函数调用前初始化。
  * 对于派生类，在 super() 后立刻初始化。
  * 如果出问题了，我们可以通过使用方法或者 getter/setter 替代类字段，来修复这个问题。
  */

  showName() {
    console.log('student')
    console.log(this.name) // name字段未初始化 使用的是继承过来的name: 'person'属性
  }
}

const p = new Person()
const s = new Student()
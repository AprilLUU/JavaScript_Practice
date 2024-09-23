/**
 *  子类实例的隐式原型的隐式原型等于父类的显式原型
 *  即 Children.prototype.__proto__ == Parent.prototype 
 *     childInstance.__proto__.__proto__ == Parent.prototype
 *  子类构造函数对象的显示原型赋值为父类构造函数对象
 *  即 Children.__proto__ == Parent
 */

class Person {
  /**
   * 给类添加属性 会在每个对象都独立唯一各自的属性
   * 给类添加静态属性 会在类构造函数对象上添加属性
   * 实现继承时调用super()会在子类对象上添加对应的属性
   */
  static personID = Math.floor(Math.random() * 100)
  personType = 'coder'

  constructor(name, age) {
    this.name = name
    this.age = age
  }
  /**
   * 给类添加方法默认添加到原型上，静态方法添加到类构造函数对象上
   * 子类实现方法重写即 
   * 父类的方法仍放在父类的原型上 子类的方法放在子类的原型上(静态方法放在子类构造函数对象上)
   * 当执行方法时就可以沿原型链先查找到子类的方法去执行 实现方法重写
   */
  eating() {
    console.log('eating')
  }

  /**
   * 静态方法
   * 直接把方法放在Person函数对象上
   */
  static staticMethod() {
    console.log('staticMethod')
  }
}

class Student extends Person {
  constructor(name, age, address) {
    /**

     * 猜测super 有两个使用场景指向不同 
     * 当调用父类方法和访问父类属性时 super即父类实例对象
     * 当调用父类静态方法和访问父类静态属性和调用父类构造器时 super即父类构造函数对象
     */
    super(name, age) // Person.call(this, name, age)
    this.address = address
  }
  /**
   * 方法重写
   * 继承过来的方法仍放在Person.prototype(父类原型上)
   * 把方法放在Student.prototype（子类原型）上
   */
  eating() {
    super.eating()
    console.log(super.eating) 
    console.log(this.name + 'eating')
  }

  studying() {
    console.log('studying')
  }

  static staticMethod() {
    super.staticMethod()
    console.log('studeng staicMethod')
  }
}

const stu = new Student('why', 18, 'gz')

console.log(Object.getOwnPropertyDescriptors(new Person('kobe', 21)))
console.log(Object.getOwnPropertyDescriptors(stu))
console.log(Object.getOwnPropertyDescriptors(stu.__proto__))
console.log(Object.getOwnPropertyDescriptors(stu.__proto__.__proto__))
console.log(Object.getOwnPropertyDescriptors(Person))
console.log(Object.getOwnPropertyDescriptors(Student))
Student.staticMethod()
stu.eating()
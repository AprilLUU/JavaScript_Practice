const names = ['kobe', 'why', 'james']

class Person {
  /**
   * new 调用构造方法
   * 1. 在内存创建一个对象
   * 2. 将Person.prototype赋值给对象的[[prototype]]
   * 3. this赋值为创建的新对象
   * 4. 执行函数体
   * 5. return this
   */
  constructor(name, age, adress) {
    this.name = name
    this.age = age
    this._adress = adress
  }

  eating() {
    console.log(this.name + 'eating')
  }

  get adress() {
    return this._adress
  }

  set adress(newVal) {
    this._adress = newVal
  }

  static randomPerson() {
    const nameIndex = Math.floor(Math.random() * names.length)
    const name = names[nameIndex]
    const age = Math.floor(Math.random() * 100)

    return new Person(name, age)
  }
}

const p = new Person('kobe', 18)
const p1 = Person.randomPerson()

console.log(Object.getOwnPropertyDescriptors(Person.prototype))
function Student(name, age) {
  this.name = name
  this.age = age
}

function Teacher() {

}

const s = new Student('why', 18)
console.log(s.__proto__ === Student.prototype)

// 创建一个Student对象，但是这个对象的原型的构造器为Teacher
// 创建一个Teacher对象，执行的是Student的构造函数
Reflect.construct(Student, ['why', 18], Teacher)
function Person(name, age, friends) {
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype.eating = function() {
  console.log(this.name + ' eating')
} 

function Student(name, age, sno) {
  Person.call(this, name, age, [])
  this.sno = sno
}

Object.setPrototypeOf(Student.prototype, Person.prototype)
// Student.prototype.__proto__ = Person.prototype
const s = new Student("lry", 18, 270)
console.log(s)
console.log(s.__proto__ === Person.prototype)
console.log(s.__proto__.__proto__ === Person.prototype)
console.log(Object.getOwnPropertyDescriptors(Student.prototype))
console.log(Object.getOwnPropertyDescriptors(Person.prototype))
s.eating()
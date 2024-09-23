function Person1(name, age) {
  this.name = name
  this.age = age
  // this.eating = () => {
  //   console.log( this.name + 'eating' )
  // }
}

Person1.prototype.eating = function() { 
  console.log( this.name + 'eating' )
}

const p = new Person1('why', 18)
p.eating()

function Student1(name, age, sno) {
  Person1.call(this, name, age)
  this.sno = sno
}

Student1.prototype.studying = function() {
  console.log(this.name + 'studying')
}
Student1.prototype.eating = function() {
  Person1.prototype.eating.call(this)
  console.log(this.name + this.sno + 'eating')
}
/**
 * Object.getPrototypeOf
 * Object.setPrototypeOf
 * __proto__是prototype的getter setter
 */
Student1.prototype = Object.create(Person1.prototype)
// Student1.prototype.__proto__ = Person1.prototype

const stu = new Student1('lry', 21, 111)
stu.eating()
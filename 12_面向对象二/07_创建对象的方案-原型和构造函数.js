function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.eating = function() {
  console.log(this.name + 'eating')
}

let p1 = new Person('why', 18)
let p2 = new Person('kobe', 20)
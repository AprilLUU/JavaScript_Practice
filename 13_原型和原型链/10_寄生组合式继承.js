function inheritPrototype(SubType, SuperType) {
  SubType.prototype = Object.create(SuperType.prototype)

  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true, 
    value: SubType
  })
}


function Person(name, age, friends) {
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype = {
  eating() {
    console.log(this.name + 'eating')
  },
  running() {
    console.log(this.name + 'running')
  }
}

Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  configurable: true,
  writable: true, 
  value: Person
})

function Student(name, age, sno) {
  Person.call(name, age)
  this.sno = sno
}

inheritPrototype(Student, Person)

// Student.prototype = Object.create(Person.prototype)

// Object.defineProperty(Student.prototype, 'constructor', {
//   enumerable: false,
//   configurable: true,
//   writable: true, 
//   value: Student
// })

Student.prototype.studying = function() {
  console.log('studying')
}

function inheritPrototype(SubType, SuperType) {
  SubType.prototype = Object.create(SuperType, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      value: SubType
    }
  })
}
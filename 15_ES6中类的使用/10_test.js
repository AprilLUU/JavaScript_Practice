function inheritPrototype(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      wirtable: true,
      value: subClass
    }
  })
}

function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function Person() {
  classCallCheck(this, Person)
}

function Student() {
  classCallCheck(this, Student)
  Person.call(this)
}

inheritPrototype(Student, Person)

const stu = new Student()


class Person {

}

function mixinRunner(BaseClass) {
  class NewClass extends BaseClass {
    running() {
      console.log('running')
    }
  }

  return NewClass
}

function mixinEater(BaseClass) {
  return class extends BaseClass {
    eating() {
      console.log('eating')
    }
  }
}

//JS只支持单继承，不支持多继承
class Student extends Person {

}

const newStuClass = mixinEater(mixinRunner(Student))
console.log(newStuClass)
const newStu = new newStuClass()
console.log()
newStu.running()
newStu.eating()

const runnnerMixin = {
  running() {
    console.log('running')
  }
}

Object.assign(Student.prototype, runnnerMixin)
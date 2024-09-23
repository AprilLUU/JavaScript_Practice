let personObj = {
  running() {
    console.log('running')
  }
}

let stuObj = Object.create(personObj)
stuObj.name = 'why'
stuObj.studying = function() {
  console.log('studying')
}

function createStudent(name) {
  let stu = Object.create(personObj)
  stu.name = 'why'
  stu.studying = function() {
    console.log('studying')
  }
  return stu
}
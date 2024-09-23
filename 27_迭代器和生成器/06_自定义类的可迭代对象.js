class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  entry(newStudent) {
    this.students.push(newStudent)
  }

  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
      return: () => {
        console.log('迭代器提前终止了')
        return { done: true, value: undefined }
      }
    }
  }
}

const classroom = new Classroom('gz', 'computer', ['james', 'curry'])
classroom.entry('lilei')

for (const stu of classroom) {
  console.log(stu)
  if (stu === 'curry') break
}
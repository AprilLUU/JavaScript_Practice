function createArrayIterator(arr) {
  let index = 0
  return {
    next() {
      if (index < arr.length) {
        return { done: false, value: arr[index++] }
      } else {
        return { done: true, value: undefined }
      }
    }
  }
}

function* createArrayIterator1(arr) {
  // 3
  yield* arr
  // 2
  // for (const item of arr) {
  //   yield item
  // }
  // 1
  // let index = 0
  // yield arr[index++]
  // yield arr[index++]
  // yield arr[index++]
}

function createRangeIterator(start, end) {
  let index = start
  while (index < end) {
    yield index++
  }
  // let index = start
  // return {
  //   next() {
  //     if (index < end) {
  //       return { done: false, value: index++ }
  //     } else {
  //       return { done: true, value: undefined }
  //     }
  //   }
  // }
}

const rangeIterator = createRangeIterator(10, 20)
console.log(rangeIterator.next())


class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  entry(newStudent) {
    this.students.push(newStudent)
  }

  // [Symbol.iterator] = function*() {
  //   yield* this.students
  // }

  *[Symbol.iterator]() {
    yield* this.students
  }

  // [Symbol.iterator]() {
  //   let index = 0
  //   return {
  //     next: () => {
  //       if (index < this.students.length) {
  //         return { done: false, value: this.students[index++] }
  //       } else {
  //         return { done: true, value: undefined }
  //       }
  //     },
  //     return: () => {
  //       console.log('迭代器提前终止了')
  //       return { done: true, value: undefined }
  //     }
  //   }
  // }
}

const classroom = new Classroom('gz', 'computer', ['james', 'curry'])
classroom.entry('lilei')
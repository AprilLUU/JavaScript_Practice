const iterator = {
  next() {
    return { done: true, value: 123 }
  }
}

const names = ['abc', 'cba', 'nba']

let index = 0
const namesIterator = {
  next() {
    if (index < names.length) {
      return { done: false, value: names[index++]}
    } else {
      return { done: true, value: undefined }
    }
    // return { done: false, value: 'abc' }
    // return { done: false, value: 'cba' }
    // return { done: false, value: 'nba' }
    // return { done: true, value: undefined }
  }
}




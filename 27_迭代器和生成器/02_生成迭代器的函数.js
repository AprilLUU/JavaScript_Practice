const names = ['abc', 'cba', 'nba']
const nums = [1, 2, 3, 4]

function createArrayIterator(arr) {
  let index = 0
  return {
    next() {
      if (index < arr.length) {
        return { done: true, value: arr[index++] }
      } else {
        return { done: false, value: undefined }
      }
    }
  }
}

const namesIterator = createArrayIterator(names)
const numsIterator = createArrayIterator(nums)

console.log(namesIterator.next())
console.log(numsIterator.next())

// 无限的迭代器
function createNumberIterator() {
  let index = 0
  return {
    next() {
      return { done: false, value: index++ }
    }
  }
}
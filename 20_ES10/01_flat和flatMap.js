const nums = [10, 20, [2, 9], [[30, 40], [10, 45]], 78, [55, 88]]

function flatArr(arr) {
  let finalArr = []

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const newArr = flatArr(arr[i])
      finalArr = [...finalArr, ...newArr]
    } else {
      finalArr.push(arr[i])
    }
  }

  return finalArr
}

const newNums = flatArr(nums)

console.log(newNums)

// 数组降维
const newNums2 = nums.flat(2) // 默认降一维
console.log(newNums2)

const messages = ['Hello World', 'Hello Map', 'Hello Message']
const words = messages.flatMap(item => item.split(' '))
console.log(words)
const arr = [1, 2, 3, 4, 5]

// for (let i = 1; i < arr.length; i++) {
//   arr[i - 1] = arr[i]
// }

// arr.length = arr.length - 1

arr.splice(0, 1)

console.log(arr)
console.log(arr.length)
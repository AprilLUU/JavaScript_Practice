var nums = [10, 5, 11, 100, 55]

const resultNums = nums.filter(num => num % 2 === 0)
const newNums = nums.map(num => num + 1)
const count = nums.reduce((preValue, currentValue) => preValue + currentValue, 0)

console.log(nums)
console.log(resultNums)
console.log(newNums)
console.log(count)

var friends = [
  {name: 'why', age: 18},
  {name: 'kobe', age: 19},
  {name: 'james', age: 20},
  {name: 'curry', age: 21},
]

friends.forEach(item => console.log(item.name))

friends.find(item => item.age == 18)
friends.findIndex(item => item.age == 18)
const name = 'why'
const age = 18

function sum(num1, num2) {
  return num1 + num2
}

console.log('test module start')
console.log('test module end')

module.exports = {
  name,
  age,
  sum
}
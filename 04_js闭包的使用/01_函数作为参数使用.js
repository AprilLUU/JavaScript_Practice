function calc(num1, num2, calcFn) {
  calcFn(num1, num2)
}

function add(num1, num2) {
  return num1 + num2
}

function sub(num1, num2) {
  return num1 - num2
}

calc(1, 2, add)
calc(1, 2, sub)
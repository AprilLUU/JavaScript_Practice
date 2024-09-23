// export const name = 'why'
// export const age = 18
// export function sum(num1, num2) {
//   return num1 + num2
// }

const name = 'why'
const age = 18
function foo() {
  console.log('foo')
}

export {
  name, 
  age, 
  foo
}

// export {
//   name, 
//   age, 
//   foo as default
// }

// export default foo

// export {
//   name as fName,
//   age as fAge,
//   foo as fFoo
// }
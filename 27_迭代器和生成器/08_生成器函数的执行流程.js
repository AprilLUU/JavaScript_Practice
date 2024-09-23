/**
 * yield是暂停函数的执行
 * 调一次next会执行一次yield前面的代码
 * return会直接终止函数
 */

function* generatorFunction() {
  console.log('fun start')

  const value1 = 100
  console.log(value1)
  // return value1
  console.log('fun continue')
  yield value1

  const value2 = 200
  console.log(value2)
  yield value2

  const value3 = 300
  console.log(value3)
  yield value3

  console.log('fun end')
}

const generator = generatorFunction()
const value1 = generator.next()
const value2 = generator.next()
const value3 = generator.next()
const value4 = generator.next()

console.log(value1, value2, value3, value4)
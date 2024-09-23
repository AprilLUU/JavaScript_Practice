function* generatorFunction(num) {
  console.log('fun start')

  const value1 = 100 * num
  console.log(value1)
  // return value1
  console.log('fun continue')
  const n = yield value1 // 返回值是第二次调用next传入的参数

  const value2 = 200 * n
  console.log(value2)
  const count = yield value2

  const value3 = 300
  console.log(value3)
  const final = yield value3

  console.log('fun end', final)
}

const generator = generatorFunction(5)
const value1 = generator.next()
const value2 = generator.next(10)
const value3 = generator.next(20)
const value4 = generator.next(30)

console.log(value1, value2, value3, value4)
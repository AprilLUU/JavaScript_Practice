function* generatorFunction(num) {
  console.log('fun start')

  const value1 = 100 * num
  console.log(value1)
  console.log('fun continue')
  const n = yield value1
  // 调用生成器的return方法，相当于在生成器函数中加了个return终止生成器函数执行
  // return n

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
// const value2 = generator.next(10)
const value2 = generator.return(10)
const value3 = generator.next(20)
const value4 = generator.next(30)

console.log(value1, value2, value3, value4)
function* foo() {
  console.log('start')

  const value1 = 100
  console.log(value1)
  try {
    yield value1
  } catch(err) {
    console.log(err)
  }

  const value2 = 200
  console.log(value2)
  yield value2

  console.log('end')
}

const generator = foo()
const value1 = generator.next()
if (value1.value !== 200) {
  generator.throw('error')
}
 // 抛出异常
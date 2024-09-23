function bar() {
  console.log('2222')
  return new Promise(resolve => {
    resolve()
  })
}

async function foo() {
  console.log('11111')
  //yield bar()
  // generator.next().value.then(res => { generator.next(res) })
  await bar()
  console.log('3333')
}

foo() 
// const res = generator.next()
// res.value.then(res => generator.next(res))
console.log('4444')

//会将这个回调延迟300ms加入宏任务队列
// setTimeout(() => {
//   console.log('setTimeout 300')
// }, 300) 
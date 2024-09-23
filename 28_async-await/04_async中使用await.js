function createPromise(message) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(message)
    }, 2000)
  })
}

async function foo() {
  //相当于 const res = yield createPromise('promise1')
  // generator.next().value.then(res => { generator.next(res) })
  // 所以会等待promise有了结果之后调用resolve拿到res再执行后面的代码
  const res1 = await createPromise('promise1')
  console.log(res1)
  const res2 = await createPromise('promise2')
  console.log(res2)
  // 如果是其他值，则调用Promise.resolve(value)进行包裹返回
  const res3 = await 'test'
  console.log(res3)
  // 如果是rejected状态的promise，会把reject结果直接给async返回的Promise的reason进行返回，并且后面代码都不会执行
  const res4 = await new Promise(reject => reject('error'))
  console.log(res4)
}


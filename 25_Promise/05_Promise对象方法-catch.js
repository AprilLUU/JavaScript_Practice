const promise = new Promise((resolve, reject) => {
  reject('reject status')
  // throw new Error('promise reject')
})

//1. executor调用reject或者抛出异常 来到第二个回调
//2. 当executor出现异常没有捕获时会出错
promise.then(null, err => {
  console.log(err)
})

promise.catch(err => {
  console.log(err)
})

// catch方法捕获promise链式调用中的异常
promise.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err) //reject status
})

promise.then(res => {
  console.log(res)
  throw new Error('new promise error')
}).catch(err => {
  console.log(err) // reject status
})

const promise1 = new Promise((resolve, reject) => {
  resolve('success status')
})

promise1.then(res => {
  console.log(res)
  throw new Error('new promise error')
}).catch(err => {
  console.log(err) // success status
})

//catch方法可以多次调用
promise.catch(err => {
  console.log(err)// reject status
})
promise.catch(err => {
  console.log(err)// reject status
})
promise.catch(err => {
  console.log(err)// reject status
})

//catch方法的返回值也是一个Promise 与then方法一样
promise.then(res => {
  console.log(res)
  throw new Error('new promise error')
}).catch(err => {
  console.log(err) // reject status
  return 'catch return'
}).then(res => {
  console.log(res) // catch return
}).catch(err => {
  console.log(err)
})
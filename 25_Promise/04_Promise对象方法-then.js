console.log(Object.getOwnPropertyDescriptors(Promise.prototype))

const promise = new Promise((resolve, reject) => {
  resolve('success')
})

// 1. 同一个promise可以调用多次then方法
// 调用resolve/reject时所有的then方法都会被执行, res/err都是resolve/reject传递过来的值
promise.then(res => {
  console.log('res1' + res)
}, err => {
  console.log(err)
})

promise.then(res => {
  console.log('res2' + res)
}, err => {
  console.log(err)
})

promise.then(res => {
  console.log('res3' + res)
}, err => {
  console.log(err)
})

// 2. then方法传入的回调函数可以有返回值
// then方法返回一个新的Promise对象
// 1 -> 如果返回的是一个普通值，这个值会被当成新的Promise的resolve值
promise.then(res => {
  return 'new promise1'
}).then(res => {
  console.log(res) // new promise1
})

// 2 -> 没有返回值，新的Promise的resolve值是undefined
promise.then(res => {
  console.log(res)
}).then(res => {
  console.log(res) // undefined
})

// 3 -> 返回一个Promise, resolve的是一个Promise，状态会由返回的Promis决定
promise.then(res => {
  console.log(res)
  return new Promise(resolve => {
    resolve('return promise')
  })
}).then(res => {
  console.log(res) // return promise
})

// 4 -> 返回一个thenable对象
promise.then(res => {
  console.log(res)
  return {
    then(resolve, reject) {
      resolve('thenable')
    }
  }
}).then(res => {
  console.log(res) // thenable
})
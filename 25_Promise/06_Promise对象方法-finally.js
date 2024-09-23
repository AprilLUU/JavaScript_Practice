const promise = new Promise((resolve, reject) => {
  resolve('success')
})

// finally方法无论promise状态如何都会调用
promise.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
}).finally(() => {
  console.log('finally executor')
})
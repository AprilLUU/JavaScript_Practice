function foo() {
  return new Promise((resolve, reject) => {

  })
}

// new Promise传入的函数(executor)会立即执行
// 状态一旦敲定就不会再改变
const promise = new Promise((resolve, reject) => {
  // pending状态
  let flag = 'success'
  if (flag === 'success') {
    // fulfilled状态
    resolve(flag)
  } else {
    flag = 'error'
    // rejected状态
    reject(flag)
  }
})

promise.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
}).finally(() => {
  console.log('finally')
})

promise.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})
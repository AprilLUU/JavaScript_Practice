Promise.resolve().then(() => {
  console.log(0)
  // return value
  // Promise.resolve(value)
  // return 4
  // return 一个thenable 多推迟一次微任务
  // Promise.resolve(thenable)
  // 调用一次resolve 多加一次微任务
  // return {
  //   then(resolve) {
  //     resolve(4)
  //   }
  // }
  // return Promise.resolve() 多推迟两次微任务
  // return Promise.resolve(Promise.resolve(4))
  // 调用resolve 如果值是一个promise 会等待promise的状态即调用完resolve或reject之后再去重新调用一次resolve
  // return new Promise(resolve => resolve(new Promise(resolve => resolve(4))))
  return Promise.resolve(4)
}).then(res => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})

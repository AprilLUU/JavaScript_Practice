Promise.resolve()
  .then(() => {
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
    // 调用流程 微任务队列
    // resolve -> Promise.then(resolve, reject) -> Promise.resolve(4)(有了结果之后) -> resolve(4)
    return Promise.resolve(4)
  })
  .then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })

// 0 4 1 2 3 5 6
// Promise.resolve().then(() => {
//   console.log(0)
// })
// //第二个Promise链
// Promise.resolve(4).then((res) => {
//   console.log(res)
// })
// //第三个Promise链
// Promise.resolve()
//   .then(() => {
//     console.log(1)
//   })
//   .then(() => {
//     console.log(2)
//   })
//   .then(() => {
//     console.log(3)
//   })
//   .then(() => {
//     console.log(5)
//   })
//   .then(() => {
//     console.log(6)
//   })

// 0 1 2 4 3 5 6
// Promise.resolve()
//   .then(() => {
//     //1
//     console.log(0)
//     return {
//       then: function (resolve) {
//         //1.5
//         // 大量的计算
//         resolve(4)
//       }
//     }
//   })
//   .then((res) => {
//     //2
//     console.log(res)
//   })

// //第二个Promise链
// Promise.resolve()
//   .then(() => {
//     //3
//     console.log(1)
//   })
//   .then(() => {
//     //4
//     console.log(2)
//   })
//   .then(() => {
//     //5
//     console.log(3)
//   })
//   .then(() => {
//     //6
//     console.log(5)
//   })
//   .then(() => {
//     //7
//     console.log(6)
//   })

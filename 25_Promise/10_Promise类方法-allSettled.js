const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1111)
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2222)
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3333)
  }, 3000)
})

// 当所有promise的状态都敲定时,再拿到结果,结果存储每个promise的状态和结果
// 整个promise的状态一定是fulfilled
Promise.allSettled([p1, p2, p3]).then(res => {
  console.log(res) 
  // [{ status: fulfilled, value: 1111 }, { status: rejected, value: 2222 },{ status: fulfilled, value: 3333 },]
})
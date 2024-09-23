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

// 等到第一个状态为fulfilled的promise
// 如果所有promise都变成rejected,则会等到所有promise都rejected之后在执行catch
Promise.any([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err) // all promise were rejected
})
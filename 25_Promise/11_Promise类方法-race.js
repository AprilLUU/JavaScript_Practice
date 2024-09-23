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

//拿到第一个敲定状态的Promise的结果
Promise.race([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
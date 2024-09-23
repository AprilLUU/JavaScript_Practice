const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1111)
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2222)
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3333)
  }, 3000)
})

// 当所有promise都变成fulfilled时,再拿到结果
// 在拿到所有结果之前，有一个promise变成rejected时，整个promise都是rejected
Promise.all([p1, p2, p3]).then(res => {
  console.log(res) // [1111, 2222, 3333]
}).catch(err => {
  console.log(err)
})
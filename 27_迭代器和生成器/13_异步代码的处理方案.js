function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 2000)
  })
}

// requestData('why').then(res => {
//   requestData(res + 'aaa').then(res => {
//     requestData(res + 'bbb').then(res => {
//       console.log(res)
//     })
//   })
// })

// requestData('why').then(res => {
//   console.log(res)
//   return requestData(res + 'aaa')
// }).then(res => {
//   console.log(res)
//   return requestData(res + 'bbb')
// }).then(res => {
//   console.log(res)
// })

function* getData() {
  const res1 = yield requestData('why')
  const res2 = yield requestData(res1 + 'aaa')
  const res3 = yield requestData(res2 + 'bbb')
  console.log(res3)
}

// const generator = getData()
// generator.next().value.then(res => {
//   generator.next(res).value.then(res => {
//     generator.next(res)
//   })
// })
function execGenerator(genFn) {
  const generator = genFn()

  function exec(res) {
    const result = generator.next(res)
    if (result.done) {
      return result.value
    }
    result.value.then(res => {
      exec(res)
    })
  }

  exec()
}

execGenerator(getData)

const co = require('co')
co(getData)

// promise + generator
async function getData1() {
  /**
   * const res1 = yield requestData('why')
   * generator.next().value.then(res => {
   *  generator.next(res)
   * })
   */
  const res1 = await requestData('why')
  const res2 = await requestData(res1 + 'aaa')
  const res3 = await requestData(res2 + 'bbb')
  console.log(res3)
}

getData1()
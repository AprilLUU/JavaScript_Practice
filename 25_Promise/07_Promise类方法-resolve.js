function foo() {
  const obj = {}
  // return new Promise(resolve => resolve(obj))
  return Promise.resolve(obj)
}

const promise = Promise.resolve('success')

const promise1 = new Promise((resolve, reject) => {
  resolve('success')
})

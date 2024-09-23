async function foo() {
  console.log('foo start')
  console.log('foo end')
  /**
   * return value相当于
   * return new Promise(resolve => {
   *  resolve(value)
   * })
   */
  const value = 'foo return'
  return value
}

const promise = foo()
promise.then(res => {
  console.log('then statr', res)
})
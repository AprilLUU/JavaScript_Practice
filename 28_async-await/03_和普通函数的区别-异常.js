async function foo() {
  console.log('foo start')
  /**
   * 相当于
   * try {
   *  throw new Error('error')
   * } catch(err) {
   *  return new Promise(reject => {
   *    reject(err)
   *  })
   * }

   */
  throw new Error('err')
  console.log('foo end')
}

foo().catch(err => {
  console.log(err)
})
console.log('end')
const promise = new Promise(resolve => {
  resolve('success')
  // reject('error')
})
/**
 * resolve(参数)
 *  1. 传入一个普通值或者对象 pending -> fulfilled
 *  2. 传入一个Promise对象,会进行状态移交
 *     即由传入的Promise决定状态
 *  3. 传入一个thenable对象(带有then方法的对象)
 *     会自动执行该对象的then方法, 状态由then方法决定
 */
new Promise((resolve, reject) => {
  resolve(promise)
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

new Promise((resolve, reject) => {
  const obj = {
    then(resolve, reject) {
      resolve('success')
      // reject('error')
    }
  }
  resolve(obj)
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
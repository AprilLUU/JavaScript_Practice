const promise = Promise.reject('error')

//reject方法与resolve不同，无论传入什么值都将作为错误信息返回
const promise1 = new Promise((resolve, reject) => {
  reject('error')
})
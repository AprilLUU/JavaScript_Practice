class MyPromise {
  PROMISE_STATUS_PENDING = 'pending'
  PROMISE_STATUS_FULFILLED = 'fulfilled'
  PROMISE_STATUS_REJECTED = 'rejected'

  constructor(executor) {
    // 初始化状态
    this.status = this.PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = value => {
      if (this.status === this.PROMISE_STATUS_PENDING) {
        // 开启一个微任务队列，目的是为了等待then方法的回调加入成功回调数组之后再去遍历执行
        queueMicrotask(() => {
          // 如果当前不是pengding状态就return，即同时调resolve和reject时只有先调用的生效
          if (this.status !== this.PROMISE_STATUS_PENDING) {
            return
          }
          if (value instanceof MyPromise) {
            if (value.status === this.PROMISE_STATUS_FULFILLED) {
              resolve(value.value)
              return
            } else if (value.status === this.PROMISE_STATUS_REJECTED) {
              reject(value.reason)
              return
            }
          } else if (typeof value === 'object' && value.then) {
            try {
              value.then(resolve, reject)
            } catch(err) {
              reject(err)
            }
            return
          } else {
            this.status = this.PROMISE_STATUS_FULFILLED
            this.value = value
          }
          // 遍历成功回调数组 依次执行函数 数组的数组是多次调用then方法都可以执行函数
          this.onFulfilledFns.forEach(fn => fn())
        })
      }
    }

    const reject = reason => {
      if (this.status === this.PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== this.PROMISE_STATUS_PENDING) {
            return
          }
          this.status = this.PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach(fn => fn())
        })
      }
    }
    // 抛出异常直接调用reject
    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }  
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected
    const defaultOnFulfilled = value => value
    onFulfilled = onFulfilled || defaultOnFulfilled
    
    return new MyPromise((resolve, reject) => {
      // 状态已经敲定时，直接调用传入的回调
      // 调用setTimeout时是一个宏任务，调用数组中的函数为微任务，微任务先执行完，此时再调用then传入回调并不会执行
      // setTimeout(() => {
      //   promise.then(res => {
      //     console.log(res)
      //   }, err => {
      //     console.log(err)
      //   })
      // }, 0)
      if (this.status === this.PROMISE_STATUS_FULFILLED) {
        // 拿到回调返回值，传递给下一个Promise
        this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === this.PROMISE_STATUS_REJECTED) {
        this.execFunWithCatchError(onRejected, this.reason, resolve, reject)
      }
      // pending状态将回调加入回调数组
      if (this.status === this.PROMISE_STATUS_PENDING ) {
        this.onFulfilledFns.push(() => {
          this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedFns.push(() => {
          this.execFunWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  execFunWithCatchError(execFn, value, resolve, reject) {
    try {
      const result = execFn(value)
      resolve(result) 
    } catch(err) {
      reject(err)
    }
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    const onFulfilled = onFinally
    const onRejected = onFinally
    return this.then(onFulfilled, onRejected)
  }
}

const promise1 = new MyPromise((resolve, reject) => {
  resolve('success')
})

promise1.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
}).finally(() => {
  console.log('finally')
})
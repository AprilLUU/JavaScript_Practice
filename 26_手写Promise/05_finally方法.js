class MyPromise {
  PROMISE_STATUS_PENDING = 'pending'
  PROMISE_STATUS_FULFILLED = 'fulfilled'
  PROMISE_STATUS_REJECTED = 'rejected'

  constructor(executor) {
    this.status = this.PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = value => {
      if (this.status === this.PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
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

    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }  
  }

  then(onFulfilled, onRejected) {
    // 给onFulfilled和onRejected默认值 防止链式调用的时候出现断层
    // 当pengding状态时就会把回调加入成功回调数组中
    // 调用resolve/reject时才真正执行这些函数
    /**
      promise.then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        console.log('finally')
      }) 
     */
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected
    const defaultOnFulfilled = value => value
    onFulfilled = onFulfilled || defaultOnFulfilled
    
    return new MyPromise((resolve, reject) => {
      if (this.status === this.PROMISE_STATUS_FULFILLED && onFulfilled) {
        this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === this.PROMISE_STATUS_REJECTED && onRejected) {
        this.execFunWithCatchError(onRejected, this.reason, resolve, reject)
      }
      if (this.status === this.PROMISE_STATUS_PENDING ) {
        if (onFulfilled) {
          this.onFulfilledFns.push(() => {
            this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
          })
        }
        if (onRejected) {
          this.onRejectedFns.push(() => {
            this.execFunWithCatchError(onRejected, this.reason, resolve, reject)
          })
        }
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

const promise = new MyPromise((resolve, reject) => {
  resolve('success')
})

promise.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
}).finally(() => {
  console.log('finally')
})
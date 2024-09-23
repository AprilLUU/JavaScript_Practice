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
    return new MyPromise((resolve, reject) => {
      if (this.status === this.PROMISE_STATUS_FULFILLED && onFulfilled) {
        // try {
        //   const value = onFulfilled(this.value)
        //   resolve(value)
        // } catch(err) {
        //   reject(err)
        // }
        this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === this.PROMISE_STATUS_REJECTED && onRejected) {
        this.execFunWithCatchError(onRejected, this.reason, resolve, reject)
      }
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
}

// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
//   // reject('error')
//   // throw new Error('executor error')
// })

// promise.then(res => {
//   console.log(res)
//   throw new Error('resolve error')
//   // return 'then resolveCallback'
// }, err => {
//   console.log(err)
//   throw new Error('reject error')
//   // return 'then rejectCallback'
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// const promise1 = new MyPromise((resolve, reject) => {
//   resolve('success')
//   // reject('error')
//   // throw new Error('promise error')
// })

// const promise2 = new MyPromise((resolve, reject) => {
//   resolve(promise1)
// })

// promise2.then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

const obj = {
  then(resolve, reject) {
    resolve('success')
    // reject('error')
    // throw new Error('promise error')
  }
}

const promise = new MyPromise((resolve, reject) => {
  resolve(obj)
})

promise.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})
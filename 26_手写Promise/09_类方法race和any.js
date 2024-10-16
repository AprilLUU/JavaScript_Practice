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
    const defaultOnRejected = err => { throw err }
    onRejected = onRejected || defaultOnRejected
    const defaultOnFulfilled = value => value
    onFulfilled = onFulfilled || defaultOnFulfilled
    
    return new MyPromise((resolve, reject) => {
      if (this.status === this.PROMISE_STATUS_FULFILLED) {
        this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === this.PROMISE_STATUS_REJECTED) {
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

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    const onFulfilled = onFinally
    const onRejected = onFinally
    return this.then(onFulfilled, onRejected)
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new MyPromise(reject => reject(reason))
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = []
      promises.forEach((promise, index) => {
        if (!(promise instanceof MyPromise)) {
          //微任务
          promise = MyPromise.resolve(promise)
        }
        promise.then(res => {
          // 调用splice，保证每个promise中的结果在数组中的顺序
          values.splice(index, 0, res)
          if (values.length === promises.length) {
            resolve(values)
          }
        }, err => {
          reject(err)
        })
      })
    })
  }

  static allSettled(promises) {
    return new MyPromise(resolve => {
      const results = []
      promises.forEach((promise, index) => {
        if (!(promise instanceof MyPromise)) {
          promise = MyPromise.resolve(promise)
        }
        promise.then(res => {
          const promiseRes = { status: 'fulfilled', value: res }
          results.splice(index, 0, promiseRes)
          if (results.length === promises.length) {
            resolve(results)
          }
        }, err => {
          const promiseRes = { status: 'rejected', reason: err }
          results.splice(index, 0, promiseRes)
          if (results.length === promises.length) {
            resolve(results)
          }
        })
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        if (!(promise instanceof MyPromise)) {
          promise = MyPromise.resolve(promise)
        }
        // promise.then(res => {
        //   resolve(res)
        // }, err => {
        //   reject(err)
        // })
        promise.then(resolve, reject)
      })
    })
  }

  static any(promises) {
    const reasons = []
    return new MyPromise((resolve, reject) => {
      if (!(promise instanceof MyPromise)) {
        promise = MyPromise.resolve(promise)
      }
      promises.forEach(promise => {
        promise.then(resolve, err => {
          reasons.push(err)
          if (reasons.length === promises.length) {
            // reject(new AggregateError(reasons))
            reject(new AggregateError('all promises were rejected'))
          }
        })
      })
    })
  }
}

new MyPromise((resolve, reject) => {
  console.log(this, this.value)
  resolve("success")
})

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(111)
  }, 1000)
})

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(222)
  }, 2000)
})

const p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(333)
  }, 3000)
})

Promise.race([111, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

Promise.any([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
  console.log(err.errors)
})
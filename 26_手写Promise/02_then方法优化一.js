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
          this.status = this.PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach(fn => fn(this.value))
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
          this.onRejectedFns.forEach(fn => fn(this.reason))
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    if (this.status === this.PROMISE_STATUS_FULFILLED && onFulfilled) {
      onFulfilled(this.value)
    }
    if (this.status === this.PROMISE_STATUS_REJECTED && onRejected) {
      onRejected(this.reason)
    }
    if (this.status === this.PROMISE_STATUS_PENDING ) {
      this.onFulfilledFns.push(onFulfilled)
      this.onRejectedFns.push(onRejected)
    }
  }
}

const promise = new MyPromise((resolve, reject) => {
  // resolve('success')
  reject('error')
})

promise.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})

promise.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})

setTimeout(() => {
  promise.then(res => {
    console.log(res)
  }, err => {
    console.log(err)
  })
})
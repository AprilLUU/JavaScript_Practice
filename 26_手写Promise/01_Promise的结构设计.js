// const PROMISE_STATUS_PENDING = 'pending'
// const PROMISE_STATUS_FULFILLED = 'fulfilled'
// const PROMISE_STATUS_REJECTED = 'rejected'



class MyPromise {
  PROMISE_STATUS_PENDING = 'pending'
  PROMISE_STATUS_FULFILLED = 'fulfilled'
  PROMISE_STATUS_REJECTED = 'rejected'

  constructor(executor) {
    this.status = this.PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined

    const resolve = value => {
      if (this.status === this.PROMISE_STATUS_PENDING) {
        this.status = this.PROMISE_STATUS_FULFILLED
        this.value = value
        // setTimeout(() => {
        //   this.onFulfilled()
        // }, 0)
        queueMicrotask(() => {
          this.onFulfilled(this.value)
        })
      }
    }

    const reject = reason => {
      if (this.status === this.PROMISE_STATUS_PENDING) {
        this.status = this.PROMISE_STATUS_REJECTED
        this.reason = reason
        queueMicrotask(() => {
          this.onRejected(this.reason)
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }
}
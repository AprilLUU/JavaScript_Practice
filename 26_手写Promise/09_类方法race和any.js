class MyPromise {
  PROMISE_STATUS_PENDING = "pending"
  PROMISE_STATUS_FULFILLED = "fulfilled"
  PROMISE_STATUS_REJECTED = "rejected"

  constructor(executor) {
    this.status = this.PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === this.PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== this.PROMISE_STATUS_PENDING) {
            return
          }
          if (value instanceof MyPromise) {
            // if (value.status === this.PROMISE_STATUS_FULFILLED) {
            //   resolve(value.value)
            //   return
            // } else if (value.status === this.PROMISE_STATUS_REJECTED) {
            //   reject(value.reason)
            //   return
            // }
            value.then(resolve, reject)
            return
          } else if (
            typeof value === "object" &&
            typeof value.then === "function"
          ) {
            // 防止多次调用resolve和reject
            let called = falsey
            try {
              value.then(
                (y) => {
                  if (called) return
                  called = true
                  resolve(y)
                },
                (r) => {
                  if (called) return
                  called = true
                  reject(r)
                }
              )
            } catch (err) {
              if (called) return
              called = true
              reject(err)
            }
            return
          } else {
            this.status = this.PROMISE_STATUS_FULFILLED
            this.value = value
          }
          this.onFulfilledFns.forEach((fn) => fn())
        })
      }
    }

    const reject = (reason) => {
      if (this.status === this.PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          // 由于状态锁定在微任务中执行, 所以需要判断状态, 防止重复调用resolve和reject
          if (this.status !== this.PROMISE_STATUS_PENDING) {
            return
          }
          // resolve, reject先执行, then后执行
          // 因此状态锁定要放到微任务中, 避免同步代码锁死状态之后, 后调用then方法不会再触发
          this.status = this.PROMISE_STATUS_REJECTED
          this.reason = reason
          // 同步处理
          this.onRejectedFns.forEach((fn) => fn())
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled onRejected赋予默认值 用以链式传递状态和值
    const defaultOnRejected = (err) => {
      throw err
    }
    onRejected = onRejected || defaultOnRejected
    const defaultOnFulfilled = (value) => value
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new MyPromise((resolve, reject) => {
      // 如果状态已经锁死 则直接执行对应的状态回调
      // 解决情况: 异步处理 then方法被包裹在宏任务(eg: setTimeout)中时,由于在resolve和reject中采用的是微任务
      // 若不直接回调, 会由于状态锁死, 虽然回调已加入回调数组, 但不会在触发
      if (this.status === this.PROMISE_STATUS_FULFILLED) {
        this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === this.PROMISE_STATUS_REJECTED) {
        this.execFunWithCatchError(onRejected, this.reason, resolve, reject)
      }
      if (this.status === this.PROMISE_STATUS_PENDING) {
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
    } catch (err) {
      reject(err)
    }
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    const onFulfilled = () => {
      onFinally()
      // console.log("........")
      return this.value
    }
    const onRejected = () => {
      try {
        const res = onFinally()
        // console.log(res)
        // if (
        //   res instanceof MyPromise &&
        //   res.status === this.PROMISE_STATUS_REJECTED
        // ) {
        //   return res
        // }
      } catch (err) {
        return err
      }

      return this.reason
    }
    return this.then(onFulfilled, onRejected)
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = []
      promises.forEach((promise, index) => {
        if (!(promise instanceof MyPromise)) {
          //微任务
          promise = MyPromise.resolve(promise)
        }
        promise.then(
          (res) => {
            // 调用splice，保证每个promise中的结果在数组中的顺序
            values.splice(index, 0, res)
            if (values.length === promises.length) {
              resolve(values)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const results = []
      promises.forEach((promise, index) => {
        if (!(promise instanceof MyPromise)) {
          promise = MyPromise.resolve(promise)
        }
        promise.then(
          (res) => {
            const promiseRes = { status: "fulfilled", value: res }
            results.splice(index, 0, promiseRes)
            if (results.length === promises.length) {
              resolve(results)
            }
          },
          (err) => {
            const promiseRes = { status: "rejected", reason: err }
            results.splice(index, 0, promiseRes)
            if (results.length === promises.length) {
              resolve(results)
            }
          }
        )
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
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
      promises.forEach((promise) => {
        promise.then(resolve, (err) => {
          reasons.push(err)
          if (reasons.length === promises.length) {
            // reject(new AggregateError(reasons))
            reject(new AggregateError("all promises were rejected"))
          }
        })
      })
    })
  }
}

// new MyPromise((resolve, reject) => {
//   console.log(this, this.value)
//   resolve("success")
// })

// const p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(111)
//   }, 1000)
// })

// const p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(222)
//   }, 2000)
// })

// const p3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(333)
//   }, 3000)
// })

// Promise.race([111, p2, p3]).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

// Promise.any([p1, p2, p3]).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
//   console.log(err.errors)
// })

// const p = MyPromise.resolve(3).finally(() => 99)
// setTimeout(() => console.log(p))
// const p1 = MyPromise.reject(3).finally(() => {
//   throw 99
// })
// setTimeout(() => console.log(p1))
const p2 = MyPromise.reject(3).finally(() => MyPromise.reject(99))
setTimeout(() => console.log(p2))

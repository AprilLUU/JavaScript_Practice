let activeReactiveFn = null
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    this.reactiveFns.add(fn)
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

const weakMap = new WeakMap()
function getDepend(target, key) {
  let map = weakMap.get(target) 
  if (!map) {
    map = new Map()
    weakMap.set(target, map)
  }

  let depend = map.get(key) 
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }

  return depend
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const depend = getDepend(target, key)
      depend.depend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      const depend = getDepend(target, key)
      depend.notify()
    }
  })
}

function watchEffect() {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

function watch(target, key, fn, options = { immediate : false }) {
  activeReactiveFn = fn
  let value = target[key]
  if (options.immediate) {
    fn()
  }
  value = null
  activeReactiveFn = null
}

const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'
const PROMISE_STATUS_PENDING = 'pending'
function execFunWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch(err) {
    reject(err)
  }
}

class Promise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = value => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          if (value instanceof Promise) {
            if (value.status === PROMISE_STATUS_FULFILLED) {
              resolve(value.value)
              return
            } else if (value.status === PROMISE_STATUS_REJECTED) {
              reject(value.status)
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
            this.status = PROMISE_STATUS_FULFILLED
            this.value = value
          }
          this.onFulfilledFns.forEach(fn => fn())
        })
      }
    }

    const reject = reason => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
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
    onFulfilled = onFulfilled || (value => value)
    onRejected = onRejected || (err => {throw err})

    return new Promise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED) {
        execFunWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED) {
        execFunWithCatchError(onRejected, this.reason, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => {
          execFunWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedFns.push(() => {
          execFunWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }
  
  catch(undefined, onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

  static resolve(value) {
    return new Promise(resolve => resolve(value))
  }

  static reject(reason) {
    return new Promise(reject => reject(reason))
  }

  static all(promises) {
    const values = []
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }
        promise.then(res => {
          values.splice(index, 0, res)
          if (values.length === promises.length) {
            resolve(values)
          }
        }, reject)
      })
    })
  }

  static allSettled(promises) {
    const results = []
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }
        promise.then(res => {
          const promiseRes = { status: PROMISE_STATUS_FULFILLED, value: res }
          results.splice(index, 0, promiseRes)
          if (results.length === promises.length) {
            resolve(results)
          }
        }, err => {
          const promiseRes = { status: PROMISE_STATUS_REJECTED, reason: err }
          results.splice(index, 0, promiseRes)
          if (results.length === promises.length) {
            resolve(results)
          }
        })
      })
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }
        promise.then(resolve, reject)
      })
    })
  }

  static any(promises) {
    const reasons = []
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        if (!(promise instanceof Promise)) {
          promise = Promise.resolve(promise)
        }
        promise.then(resolve, err => {
          reasons.push(err)
          if (reasons.length === promises.length) {
            reject(new AggregateError('all promises were rejected'))
          }
        })
      })
    })
  }
}
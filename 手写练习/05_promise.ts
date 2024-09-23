type resolve<T> = (value: T) => void;
type reject<R> = (reason: R) => void;
type executor<T, R> = (resolve: resolve<T>, reject: reject<R>) => void;
type fulfilledFn<T> = (value?: T) => any;
type rejectedFn<R> = (reason?: R) => any;
type onFinally = (...args: any[]) => any;

interface IThenAble<T, R> {
  then?: (resolve: resolve<T>, reject: reject<R>) => any
}

const PROMISE_FULFILLED_STATUS = "fulfilled";
const PROMISE_REJECTED_STATUS = "rejected";
const PROMISE_PENDING_STATUS = "pending";

function execFunWithErr<T, R>(
  fn: fulfilledFn<T> | rejectedFn<R>,
  value: any,
  resolve: resolve<T>,
  reject: reject<R>
) {
  try {
    const result: any = fn(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}

class MyPromise<T extends IThenAble<T, R> = any, R = any> {
  status: string;
  value: T;
  reason: R;
  onFulfilledFns: Array<fulfilledFn<T>>;
  onRejectedFns: Array<rejectedFn<R>>;

  constructor(executor: executor<T, R>) {
    const resolve = (value: T) => {
      if (this.status === PROMISE_PENDING_STATUS) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_PENDING_STATUS) return;
          if (value instanceof MyPromise) {
            if (value.status === PROMISE_FULFILLED_STATUS) {
              resolve(value.value);
              return;
            }
            if (value.status === PROMISE_REJECTED_STATUS) {
              reject(value.reason);
              return;
            }
          }
          if (typeof value === "object" && value.then) {
            try {
              value.then(resolve, reject);
            } catch (err) {
              reject(err);
            }
            return;
          }
          this.status = PROMISE_FULFILLED_STATUS;
          this.value = value;
          this.onFulfilledFns.forEach((fn) => fn());
        });
      }
    };

    const reject = (reason: R) => {
      if (this.status === PROMISE_PENDING_STATUS) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_PENDING_STATUS) return;
          this.status = PROMISE_REJECTED_STATUS;
          this.reason = reason;
          this.onRejectedFns.forEach((fn) => fn());
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled: fulfilledFn<T>, onRejected?: rejectedFn<R>) {
    onFulfilled = onFulfilled || ((value: any) => value);
    onRejected = onRejected || ((err: any) => {throw err;});

    return new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_FULFILLED_STATUS) {
        execFunWithErr<T, R>(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_REJECTED_STATUS) {
        execFunWithErr<T, R>(onRejected, this.reason, resolve, reject);
      }
      if (this.status === PROMISE_PENDING_STATUS) {
        this.onFulfilledFns.push(() => {
          execFunWithErr<T, R>(onFulfilled, this.value, resolve, reject);
        });
        this.onRejectedFns.push(() => {
          execFunWithErr<T, R>(onRejected, this.reason, resolve, reject);
        });
      }
    });
  }

  catch(onRejected: rejectedFn<R>) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally: onFinally) {
    return this.then(onFinally, onFinally);
  }

  static isPromise(promise: any) {
    if (!(promise instanceof MyPromise)) {
      promise = MyPromise.resolve(promise);
    }
    return promise;
  }

  static resolve(value: any) {
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(reason: any) {
    return new MyPromise((reject) => {
      reject(reason)
    })
  }

  static all(promises: any[]) {
    return new MyPromise((resolve, reject) => {
      const result: any[] = [];
      promises.forEach((promise, index) => {
        // if (!(promise instanceof MyPromise)) {
        //   promise = MyPromise.resolve(promise)
        // }
        promise = this.isPromise(promise);
        promise.then((res: any) => {
          result.splice(index, 0, res);
          if (result.length === promises.length) {
            resolve(result);
          }
        }, reject);
      });
    });
  }

  static allSetted(promises: any[]) {
    return new MyPromise((resolve, reject) => {
      const result: any[] = [];
      promises.forEach((promise, index) => {
        // if (!(promise instanceof MyPromise)) {
        //   promise = MyPromise.resolve(promise)
        // }
        promise = this.isPromise(promise);
        promise.then(
          (res: any) => {
            const fulfilledObj = {
              status: PROMISE_FULFILLED_STATUS,
              value: res,
            };
            result.splice(index, 0, fulfilledObj);
            if (result.length === promises.length) {
              resolve(result);
            }
          },
          (err: any) => {
            const rejectedObj = {
              status: PROMISE_REJECTED_STATUS,
              reason: err,
            };
            result.splice(index, 0, rejectedObj);
            if (result.length === promises.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }

  static race(promises: any[]) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        // if (!(promise instanceof MyPromise)) {
        //   promise = MyPromise.resolve(promise)
        // }
        promise = this.isPromise(promise);
        promise.then(resolve, reject);
      });
    });
  }

  static any(promises: any[]) {
    const reason: any[] = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        // if (!(promise instanceof MyPromise)) {
        //   promise = MyPromise.resolve(promise)
        // }
        promise = this.isPromise(promise);
        promise.then(resolve, (err: any) => {
          reason.splice(index, 0, err);
          if (reason.length === promises.length) {
            reject(new Error("all promises were rejected"));
          }
        });
      });
    });
  }
}

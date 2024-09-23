### 手写Promise的逻辑

1. 初始化

   ```javascript
     PROMISE_STATUS_PENDING = 'pending'
     PROMISE_STATUS_FULFILLED = 'fulfilled'
     PROMISE_STATUS_REJECTED = 'rejected'
   ```

   ```javascript
     this.status = this.PROMISE_STATUS_PENDING // 给定pending状态
     this.value = undefined  // 保存resolve传入的value
     this.reason = undefined // 保存reject传入的reason
     this.onFulfilledFns = [] // 保存Fulfilled状态调用的回调函数
     this.onRejectedFns = [] // 保存Rejected状态调用的回调函数
   ```

   ```javascript
   // 回调函数数组的目的是当次调用then方法都能把每次的回调保存和执行
   const promise = new Promise((resolve, reject) => {
       resolve('success')
   })
   promise.then(res => {
       console.log(res)
   })
   
   promise.then(res => {
       console.log(res)
   })
   ```

   

2. resolve函数

   1} 把回调塞入微任务队列，目的是为了在then方法添加完回调之后再去执行对应的回调

   ```javascript
const promise = new Promise((resolve, reject) => {
       resolve('success')
})
   promise.then(res => {
    console.log(res)
   })
// 塞入微任务队列，会在调用栈执行完上面的代码之后，即调用then方法之后再去执行
   ```

   2）不是pending状态就直接return，目的是为了在执行executor时同时调用resolve/reject时只生效先调用的

   resolve/reject函数(即Promise状态敲定之后就不能再改变了)
   
   ```javascript
   const promise = new Promise((resolve, reject) => {
       resolve('success') // 状态已经敲定为fulfilled
       reject('err')// 再调用reject什么也不会做
   })
   ```
   
   3）resolve参数判断
   
   ​	a. 参数是一个Promise，判断它的状态，为fulfilled再次调用resolve并且return，为rejected调用reject并return
   
   ​	b.参数一个thenable对象，调用它的then方法把resolve，reject传进去，执行过程捕获到异常调用reject
   
   ​	c.参数是其他值时，直接敲定状态为fulfilled并且保存这个值
   
   4）执行成功回调数组的每个函数
   
   ```javascript
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
   ```
   

3. reject函数(逻辑与resolve函数一致，少了参数判断)

   ```javascript
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
   ```

4. 执行executor并把resolve，reject传进去，执行过程中捕获到异常就调用reject

   ```javascript
       try {
         executor(resolve, reject)
       } catch(err) {
         reject(err)
       }  
   ```

5. then方法

   1）判断状态是否已敲定（既不是pending状态）直接执行传入的回调

   ```javascript
     if (this.status === this.PROMISE_STATUS_FULFILLED && onFulfilled) {
       this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
     }
     if (this.status === this.PROMISE_STATUS_REJECTED && onRejected) {
       this.execFunWithCatchError(onRejected, this.reason, resolve, reject)
     }
   const promise = new Promise((resolve, reject) => {
       resolve('success')
   })
   // 因为resolve是在微任务队列中，setTimeout是在宏任务队列中，当resolve执行完毕，setTimeout中的
   // 回调还没执行，此时执行then方法要直接执行传入的回调，不然即使塞入到回调数组中，resolve也已经自行
   // 完毕，不会再去依次调用回调数组的函数
   setTimeout(() => {
       promise.then(res => {
           console.log(res)
       })
   }, 3000)
   ```

   2) pending状态就塞入回调数组中,塞入回调数组中用一个函数包裹，是为了拿到回调的返回值传递给下一个promise（链式调用）

   ```javascript
     this.onFulfilledFns.push(() => {
       // execFunWithCatchError是对这部分代码的封装
       // 只有当回调抛出异常，才会去调用reject，下一个promise的状态才会是rejected
       // 否则，无论返回什么值都是调用resolve传递下去
       try {
           const result = onFulfilled(this.value)
           resolve(result)
       } catch {
           reject(err)
       }
     })
   ```

   ```javascript
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
   ```

   3）给onFulfilled和onRejected默认值的原因是为了链式调用能把结果传递下去

   ​	a.给onRejected默认值

   ```javascript
   const promise = new Promise((resolve, reject) => {
       reject('error')
   })
   //当调用reject时，本来应该执行then方法传入的第二个回调，但由于then方法没有传入回调，所以数组中的函
   //数为空，所以不会执行
   const promise1 = promise.then(res => {
       console.log(res)
   })
   promise1.catch(err => {
       console.log(err)// error
   })
   //给rejected函数一个默认值，将err(this.reason)直接抛出
   //这样在执行过程中会捕获到异常将err通过调用下一个promise(promise1)的reject传递给下一个promise
   //下一个promise调用reject之后会去执行下一个promise的onRejectedFns数组中函数，因此就传递了下去
   try {
       //这里调用的resolve和reject是then方法返回的promise的reoslve和reject
       const result = onFulfilled(this.value)
       resolve(result)
   } catch {
       reject(err)
   }
   const defaultOnRejected = err => { throw err }
   onRejected = onRejected || defaultOnRejected
   ```

   ​	b. 给onFulfilled默认值

   ```javascript
   const promise = new Promise((resolve, reject) => {
       resolve('success')
   })
   // 由于catch函数调用的是this.then(undefined, onRejected)
   // 所以promise1中的onFulfilledFns是一个空数组
   // 在执行then函数返回一个新的promise中调用了promise1的resolve函数
   // 所以会去执行promise1中的onFulfilledFns函数
   this.onFulfilledFns.push(() => {
       // 在onFulfilledFns中的函数执行时才会去调用下一个promise的resolve/reject
   	this.execFunWithCatchError(onFulfilled, this.value, resolve, reject)
   })
   // 但是promise1中的onFulfilledFns是一个空数组，所以promise中的resolve不会执行，因此不
   // 会打印finally
   const promise1 = promise.then(res => {
       console.log(res)
   })
   const promise2 = promise1.catch(err => {
       console.log(err)
   })
   promise2.finally(() => {
       console.log('finally')
   })
   // 给onFulfilled一个默认值，promise1就可以调用promise2中的resolve正确传递下去
   const defaultOnFulfilled = value => value
   onFulfilled = onFulfilled || defaultOnFulfilled
   // 调用reject可以正确传下去的原因是因为promise1中的onRejected函数并不为空，所以可以执行promise2
   // 的resolve或者rejejct 因此可以正确传递下去
   const promise = new Promise((resolve, reject) => {
       reject('success')
   })
   const promise1 = promise.then(res => {
       console.log(res)
   })
   const promise2 = promise1.catch(err => {
       console.log(err)
   })
   promise2.finally(() => {
       console.log('finally')
   })
   ```

   ```javascript
    then(onFulfilled, onRejected) {
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
   ```

6. catch方法

   ```javascript
     catch(onRejected) {
       return this.then(undefined, onRejected)
     }
   ```

   

7. finally方法

   ```javascript
     finally(onFinally) {
       const onFulfilled = onFinally
       const onRejected = onFinally
       return this.then(onFulfilled, onRejected)
     }
   ```

   

8. execFunWithError函数，调用的resolve和reject是then方法返回的promise的resolve和reject，value如果调用的是onFulfilled就是this.value,如果调用的是onRejected就是this.reason

   ```javascript
     execFunWithCatchError(execFn, value, resolve, reject) {
       try {
         const result = execFn(value)
         resolve(result) 
       } catch(err) {
         reject(err)
       }
     }
   ```

   
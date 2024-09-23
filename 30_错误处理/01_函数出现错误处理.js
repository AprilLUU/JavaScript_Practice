function sum(num1, num2) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    throw new TypeError('parameters must be number type')
  }
  return num1 + num2
}

class MyError extends Error {
  constructor(errorCode, errorMessage) {
    this.errorCode = errorCode
    this.errorMessage = errorMessage
  }
}

function foo() {
  // 1. 字符串类型
  // throw 'error'
  // 2. 对象类型
  // throw { errorCode: 1001, errorMessage: 'error' }
  // 3. 创建类的对象
  // thror new MyError(1001, 'error')
  const error = new Error('error')
  console.log(error.message)
  console.log(error.name)
  console.log(error.stack)
  throw error
}

try {
  foo()
} catch(err) {
  console.log(err)
} finally {
  console.log('finally')
}
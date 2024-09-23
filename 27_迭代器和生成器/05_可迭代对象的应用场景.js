const iteratorObj = {
  names: ['abc', 'cba', 'nba'],
  [Symbol.iterator]() {
    let index = 0
    let _this = this
    return {
      next() {
        if (index < _this.names.length) {
          return { done: false, value: _this.names[index++]}
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}

//1. for...of... 遍历
for (const value of iteratorObj) {
  console.log(value)
}
//2. 展开运算符...
const names = [...iteratorObj]

const obj = { name: 'why', age: 18 }
// 用的不是迭代器
const newObj = {...obj}

//3. 解构语法
const [ name1, name2 ] = iteratorObj

//4. 创建其他对象
const set = new Set(iteratorObj)

// 5.Promise
// 将可迭代对象的迭代器每次返回的值用Promise.resolve(value)包裹成一个Promise
Promise.all(iteratorObj).then(res => {
  console.log(res)
})
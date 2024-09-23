/**
 * 迭代器，符合迭代器协议的对象
 * 即有next函数，返回值为 { done： false/true, value: value/undefined }的对象
 * 可迭代对象，符合可迭代协议的对象
 * 即实现了[Symobol.iterator]函数，返回值是一个迭代器的对象
 */

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

const iterator = iteratorObj[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

//新的迭代器(每次调用都生成新的迭代器)
const iterator1 = iteratorObj[Symbol.iterator]()

// for...of只能遍历可迭代对象 调用[Symbol.iterator]().next()
for (const value of iteratorObj) {
  console.log(value)
}
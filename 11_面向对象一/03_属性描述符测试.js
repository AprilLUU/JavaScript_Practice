'use strict'

const obj = {
  
}

Object.defineProperty(obj, 'name', {
  configurable: true,
  writable: false
})

//非严格模式下会忽略这种静默错误
// obj.name = 'xxx'
console.log(obj)
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))

//不可重复定义某一个属性
Object.defineProperty(obj, 'name', {
  configurable: false,
  writable: true
})

obj.name = 'xxx'
console.log(obj)
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
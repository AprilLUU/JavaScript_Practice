const obj = {
  name: 'why',
  age: 18
}

const info = Object.create(obj, {
  address: {
    enumerable: false,
    value: 'gz'
  }
})

console.log(obj.hasOwnProperty('name'))

//in 操作符只会检查自身及其原型上是否有该可枚举属性
console.log('address' in obj)
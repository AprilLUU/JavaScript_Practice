// const test = require('./test.js')

// console.log(test.name, test.age)
// console.log(test.sum(1, 2))

// function require(path) {
//   return module.exports
// }

// module.exports是一个对象
// require查找路径文件中的module.exports对象返回出去
// require返回值与modeule.exports是同一个引用

const { name, age, sum } = require('./test.js')

console.log(name, age)
console.log(sum(1, 2))
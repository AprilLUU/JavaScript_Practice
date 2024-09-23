let names = ['kobe', 'james', 'why', 'curry']

/**
 * 纯函数
 * 相同的输入，产生确定的输出
 * 没有产生副作用，例如修改全局变量，修改参数，修改外界存储的变量等
 */

// 纯函数，每次输入相同的参数，都会返回一个确定的数组，不会产生任何副作用
let newNames = names.slice(1, 3)

// 不是一个纯函数，会修改原数组
let spliceNames = names.splice(2)
console.log(spliceNames, names)

//纯函数(Pure Function)
function sum(n1, n2) {
  return n1 + n2
}

function test(info) {
  return {
    ...info,
    age: 100
  }
}

//不是纯函数
let name = 'why'
function bar() {
  name = 'kobe'
}

function baz(info) {
  info.age = 100
}
let obj = { age: 19 }
baz(obj)



export {}
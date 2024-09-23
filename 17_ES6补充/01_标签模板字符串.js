function foo(strArr, ...args) {
  console.log(strArr)
  console.log(...args)
}

const name = 'why'
const age = 18
/**
 * 通过标签模板字符串调用函数
 * 函数会接收对应的参数
 *  1. 第一个参数为字符串数组，按引用变量的地方进行切割
 *    eg： ['Hello', 'World', '']
 *  2. 余下使用变量的地方会按顺序传递给函数
 *    eg： name, age
 */
foo `Hello${name}World${age}`
foo `Hello${name}Wo${age}rld`
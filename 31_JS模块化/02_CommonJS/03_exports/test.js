const name = 'why'
const age = 18

function sum(num1, num2) {
  return num1 + num2
}
/**
 * 源码
 * module.exports = {}
 * exports = module.exports
 *  
 */

// 导出无效
exports.name = name
exports.age = age
exports.sum = sum

// 给module.exports赋值了一个新对象
module.exports = {

}


// 导出的对象是module.exports
// 给exports赋值一个新对象，exports不指向module.exports不能导出
// exports = {}
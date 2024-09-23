/**
 * require查找规则
 * 1. require('内置模块'),直接查找内置模块并返回
 * 2. require('./../ /X'),查找相对路径或绝对路径
 *  2.1./ ../表示查找相对路径 / 表示查找绝对路径(当前文件的根路径)
 *  2.2 如果有后缀名，直接查找对应的文件
 *  2.3 没有后缀名
 *    2.3.1 查找文件X
 *    2.3.2 查找X.js文件
 *    2.3.3 查找X.json文件
 *    2.3.4 查找X.node文件
 *    2.3.4 将X当成目录，查找目录下的index文件(X/index.js, X/index.json, X/index.node)
 * 3. require('X')
 *  按照module.paths(node_modules)
 *  依次查找对应的文件，如果是目录，查找目录下的index文件(X/index.js, X/index.json, X/index.node)
 */

console.log(module.paths)
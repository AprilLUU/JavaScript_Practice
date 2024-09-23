/**
 * 可读性差
 * 在执行过程中可能被修改，存在安全隐患
 * 必须经过JS解释器，不能被JS引擎优化
 */

var jsString = 'var message = "hello world"; console.log(message)'

eval(jsString)
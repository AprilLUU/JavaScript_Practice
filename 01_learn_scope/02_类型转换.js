/**
 * Stirng(), Number(), Boolean() 返回的一个原始类型的值
 * new String(), new Number(), new Boolean()返回一个对象 [[PrimitiveValue]]属性值为构造器传入的值
 */

const b1 = Boolean(true)
const b2 = new Boolean(true)
console.log(b1, b2)

/**
 * 字符串转换
 * 1. value + '' 字符串拼接隐式转换 
 * 2. String(value) 显式转换对应的值
 * 
 * 数字转换
 * 1. 算术运算符会将不是number类型的值隐式转换为number类型(+ 与字符串拼接除外)
 * 2. 也可以用一元运算符+value隐式转换
 * 3. 也可以用Number(value)显示转换
 * 4. null -- 0 undefined -- NaN true -- 1 false -- 0 '' -- 0 '1' -- 1 '1a' -- NaN
 * 
 * 布尔值转换
 * 1. Boolean(value) !value
 * 2. falsy -- NaN null undefined '' 0
 * 3. 其他值均为truly(包括 '0')
 */
const n1 = Number('')
const n2 = Number('1')
const n3 = Number('1a')
console.log(n1, n2, n3)

/**
 * 字符串比较规则
 * 1. 逐位比较字符的Unicode编码,当发现不相等时返回较大一方 （ 'abc' < 'bac')
 * 2. 比较完毕，返回剩余长度大的一方 ('abc' < 'abcd')
 * 3. 返回相等 ('abc' == 'abc')
 * 数字比较规则
 * 1. 其余类型比较时会隐式转化为number类型
 * 2. null == undefined (null只与undefined相等, null与undefined进行 == 比较时不会进行类型转换，只与对方相等)
 * 3. null和undefined进行< > <= >=运算时, null -- 0 undefined --NaN
 * 4. NaN不能与任何值进行比较（包括NaN本真，即NaN == NaN返回false)
 */
console.log(null == undefined) // true
console.log(null >= 0) // true
console.log(NaN == NaN) // false
console.log(NaN != NaN) // true
console.log(NaN !== NaN)
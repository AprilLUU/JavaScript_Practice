const obj = {}

/**
 * 存储失败 对象原型只能是对象或null值
 * __proto__只是[[prototype]]的访问器，即[[prototype]]的访问器，并非[[prototype]]本身
 * get __proto set __proto__ 存储在原型上
 * 可以用Map进行存储
 * 也可以创建一个没有原型的对象进行存储
 */
obj.__proto__ = 'xxx'

const obj1 = Object.create(null)
obj1.__proto__ = 'yyy' //正确存储
console.log(obj1.__proto__)

const map = new Map()

map.set('__proto__', 'zzz')
map.get('__proto__')
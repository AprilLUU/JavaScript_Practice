//对象原型： 对象内部属性[[prototype]](隐式原型)
let obj = { name: 'why' }
console.log(obj.__proto__) // {}
console.log(Object.getPrototypeOf(obj)) // {}
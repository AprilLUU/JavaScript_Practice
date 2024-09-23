function foo() {
  // this.__proto__ = foo.prototype
}


//函数也是一个对象 也有[[prototype]]隐式原型
console.log(foo.__proto__)
//每个函数都有显示原型prototype
console.log(foo.prototype)
// constructor 指向函数对象
console.log(foo.name === foo.prototype.constructor.name)
const f = new foo.prototype.constructor()

foo.prototype = {
  name: 'why',
  // constructor: foo
}

Object.definePropery(foo.prototype, 'constructor', {
  enumurable:false,
  configurable: true,
  writable: true,
  value: foo
})
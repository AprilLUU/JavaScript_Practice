console.log(Function)
console.log(Function.prototype)
console.log(Object)
console.log(Object.__proto__)
console.log(Object.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__)
console.log(Function.prototype.__proto__ === Object.prototype)

console.log(Function.__proto__, Function.__proto__ === Object.prototype)


// function Function() {}
/**
 * 函数都是new Function创建出来的
 * Function.__proto__ = Function.prototype
 * Object.__proto__ = Function.prototype
 * 等同于 let Foo = new Function()
 * Foo.prototype = { constructor: Foo }
 * Foo.__proto__ = Function.prototype
 * Function.prototype = { constructor: Function }
 * 对象都是new Object创建出来的
 * Foo.prototype.__proto__ = Object.prototype
 * Function.prototype.__proto__ = Object.prototype
 */
function Foo() {

}

console.log(Object.getOwnPropertyDescriptor(Object, "prototype"))
console.log(Object.prototype.__proto__)
console.log(Object.__proto__ === Function.prototype)
console.log(Function.prototype === Function.__proto__)
console.log(Function.prototype.__proto__ === Object.prototype)

const obj = {
  name: "lry"
}

const info = Object.create(obj, {
  age: {
    enumerable: true,
    value: 18
  }
})

console.log(info.__proto__ === obj)
// isPrototypeOf 检查原型链上的对象
console.log(obj.isPrototypeOf(info))
console.log(obj.__proto__.isPrototypeOf(info))

function Foo() {}
const foo = new Foo()
// foo -> Foo.prototype -> Object.prototype -> null
console.log(foo.__proto__ === Foo.prototype)
console.log(foo.__proto__.__proto__ === Object.prototype)
console.log(foo.__proto__.__proto__.__proto__)
// instanceof 检查原型链上的对象构造器
console.log(foo instanceof Foo)
console.log(foo instanceof Function)
console.log(foo instanceof Object)
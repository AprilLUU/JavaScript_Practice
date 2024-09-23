function Foo() {

}
/**
 * 执行new操作符进行的操作
 * 1. 在内存创建一个空的对象 let obj = {}
 * 2. 将这个对象的[[prototype]]属性赋值为函数的prototype属性 obj.__proto__ = Foo.prototype
 * 3. 将this绑定到这个对象  this = obj
 * 4. 执行函数体  
 * 5. 构造函数没有明确返回非空对象，返回这个对象 return this
 */
// const f = new Foo 没有参数可以省略括号
const f = new Foo()

//立即执行的构造器
let anonymousObj = new function() {

}

//new.target
function Bar() {
  /**
   * 如果是常规调用 new.target为undefined
   * 如果是new调用 new.target为function Bar() { ... }
   */
  console.log(new.target)
  if (!new.target) {
    return new Bar() // 如果不是new调用也可以内部调用并返回一个对象
  }
}

// return的值
function Foo1(name) {
  this.name = name
  /**
   * 默认返回this
   * 返回一个对象时不会返回this
   */
  return { name: 'kobe' }
}

const f1 = new Foo1('why')
f1.name // kobe
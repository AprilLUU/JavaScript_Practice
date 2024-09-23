function foo() {
  var a = b = 10
  /**
   * 等同于
   * var a = 10
   * b = 10 //相当于定义在全局作用域下
   */
}

foo()
console.log(a) // Error: a is not defined
console.log(b) // 10
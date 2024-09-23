function foo() {
  m = 100 //未声明，默认放在全局即GO对象上
}

foo()
console.log(m) // 100
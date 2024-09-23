const foo = () => {
  // 箭头函数没有arguments,往父作用域中寻找
  // node会把每个文件当成模块包裹在一个函数中执行，所以往父作用域寻找会有arguments
  console.log(arguments)
}

// foo()
console.log(foo)
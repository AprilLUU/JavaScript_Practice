console.log(window)
// 浏览器环境是window,node环境会包裹在函数中执行，this为{}并非全局对象
console.log(this)
// node全局对象
console.log(global)

if (window) {
  console.log(window)
} else {
  console.log(global)
}

console.log(globalThis)
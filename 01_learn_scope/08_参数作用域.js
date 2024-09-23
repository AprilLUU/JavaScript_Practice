var x = 0

// 当函数参数有默认值时，函数参数会形成一个参数作用域，函数体会形成自己的作用域
function foo(x, y = function() { x = 3; console.log(x) }) {
  console.log(x) // undefined
  var x = 2
  y() // 3
  console.log(x) // 2
}

console.log(x) // 0
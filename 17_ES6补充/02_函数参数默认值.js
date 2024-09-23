function foo(m, n) {
  //当传入的值为falsy时无法区分是否有传入参数
  m = m || 'defaultM'
  // m = m === undefined ? 'defaultM' : m
  n = n || 'defaultN'
}

foo(0, null)

function bar(m = 'defaultM', n = 'defaultN') {
  console.log(m, n)
}

bar()

function printInfo(info = { name: 'why', age: 18 }) {
  const { name, age } = info
  console.log(name, age)
}

function printInfo1({ name, age } = { name: 'why', age: 18 }) {
  console.log(name, age)
}

function printInfo2({ name = 'why', age = 18 } = {}) {
  console.log(name, age)
}

// 默认值的形参放在最后

function test(x, y, z = 10) {
  console.log(x, y, z)
}

function test1(x = 10, y, z) {
  console.log(x, y, z)
}

test1(undefined, 10, 20)

//有默认的函数的length属性(不会将有默认的参数以及之后的参数算入到length中)
console.log(test.length) // 2
console.log(test1.length) // 0
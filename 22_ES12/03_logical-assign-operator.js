// 逻辑赋值运算符

// 逻辑或赋值运算 ||=
let message = undefined
message = message || 'default value'
message ||= 'default value'

// 逻辑与赋值运算 &&=
const obj = {
  name: 'why',
  foo() {
    console.log('foo')
  }
}

obj.foo && obj.foo()

let info = {
  name: 'why'
}

info = info && info.name
info &&= info.name

// 逻辑空赋值运算 ??=
let message1 = null
message1 = message1 ?? 'message'
message1 ??= 'message'
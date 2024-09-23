function foo() {
  var name = 'foo'
  function bar() {
    console.log('bar' + name)
  }
  return bar
}

foo()()

var age = 100
//也是一个闭包
function test() {
  console.log(age)
}

// 解析阶段
// bar函数并不会进行解析生成ast，只会进行预解析
GO = {
  String,
  setTimeout,
  ...,
  foo: 0xa00
}

fooFunObj(0xa00) = {
  [[parentScope]]: GO,
  funBody: codeBlock
}

//运行阶段
GEC = {
  VO: GO
}

ECS = [GEC]

fooAO = {
  name: undefined,
  bar: 0xb00
}

barFunObj = {
  [[parentScope]]: fooAO,
  funBody: codeBlock
}

fooFEC = {
  VO: fooAO,
  scopeChain: fooAO + GO
}

ECS = [GEC, fooFEC]
ECS = [GEC]

barAO = {}

barFEC = {
  VO: barAO,
  scopeChain: barAO + fooAO + GO
}

ECS = [GEC, barFEC]

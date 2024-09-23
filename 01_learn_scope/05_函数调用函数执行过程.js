var message = 'hello scope'

function foo() {
  console.log(message)
}

function bar() {
  var message = 'hello bar'
  foo()
}

bar()

/**
 * 堆内存
 */
GlobalObject = {
  window, 
  messgae: 'hello scope',
  foo: 0xa00,
  bar: 0xb00
}

fooFunObj(0xa00) = {
  [[parentScope]]: GO, // 解析阶段(词法解析阶段)确定父级作用域GO
  funBody: BlockCode // 函数体
}

fooActivationObject = {
  
}

barFunObj(0xb00) = {
  [[parentScope]]: GO,
  funBody: BlockCode 
}

barActivationObject = {
  messgae: 'hello bar'
}

/**
 * 执行上下文栈(ECS)
 */
GEC = {
  VariableObjcet: GlobalObject
}

fooFEC = {
  VariableObjcet: fooActivationObject,
  scopeChain: fooActivationObject + fooActivationObject.[[parentScope]]
}

barFEC = {
  VariableObjcet: barActivationObject,
  scopeChain: barActivationObject + barActivationObject.[[parentScope]]
}

ECStack = [GEC, barFEC, fooFEC]
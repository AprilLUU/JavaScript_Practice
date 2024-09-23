async function foo() {
  console.log('foo start')
  console.log('foo end')
}

console.log('script start')
foo() // 没有特殊代码时执行流程与普通函数一致
console.log('script end')
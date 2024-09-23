function foo() {
  // 在变量声明之前无法访问，称之为暂时性死区
  console.log(name)
  const name = 'why'
}
var n = 100
// GO = { n: 100, foo, bar }
function foo() {
  // FOOAO = {} scopeChain: AO + GO
  console.log(n) // 100
}

function bar() {
  /**
   * barAO = { n: 200 }
   * scopeChain: AO + GO
   */
  var n = 200
  console.log(n) // 200
  foo()
}

bar()
console.log(n) // 100


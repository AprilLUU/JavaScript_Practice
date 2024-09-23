function foo() {
  console.log(n) // undefined
  var n = 200
  console.log(n) // 200
}

var n = 100
foo()

GO = { n: undefined, foo: 0xa00 }
fooFunObj = {[[parentScope]]: GO, funBody} // 0xa00

GEC = { VE }
ECS = [GEC]

GO = { n: 100, foo: 0xa00 }

AO = {n: undefined}
FEC = { VE, scopeChain: AO + GO}
ECS = [GEC, FEC]
AO = { n: 200 }
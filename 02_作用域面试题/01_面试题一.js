var n = 100

function foo() {
  n = 200
}

foo()

console.log(n) // 200

GO = { n: undefined, foo: 0xa00 }
fooFunObj = {[[parentScope]]: GO, funBody} // 0xa00

GEC = { VE }
ECS = [GEC]

GO = { n: 100, foo: 0xa00 }

AO = {}
FEC = { VE, scopeChain: AO + GO}
ECS = [GEC, FEC]
GO = { n: 200, foo: 0xa00 }

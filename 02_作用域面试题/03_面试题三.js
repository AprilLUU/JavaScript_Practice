var a = 100

function foo() {
  console.log(a) // undefined
  return
  var a = 200
}

foo()


GO = { a: undefined, foo: 0xa00 }
fooFunObj = {[[parentScope]]: GO, funBody} // 0xa00

GEC = { VE }
ECS = [GEC]

GO = { a: 100, foo: 0xa00 }

AO = {a: undefined}
FEC = { VE, scopeChain: AO + GO}
ECS = [GEC, FEC]


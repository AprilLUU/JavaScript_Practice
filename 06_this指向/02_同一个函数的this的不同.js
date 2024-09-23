function foo() {
  console.log(this)
}

foo() // window

var obj = {
  foo
}

obj.foo() //obj

foo.call({}) // {}
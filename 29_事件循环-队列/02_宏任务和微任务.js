setTimeout(() => {
  console.log('setTimeout')
}, 1000)

queueMicrotask(() => {
  console.log('queueMicrotask')
})

Promise.resolve().then(() => {
  console.log('Promise resolve')
})

function foo() {
  console.log('foo')
  bar()
}

function bar() {
  console.log('bar')
}

foo()

// Macrotask
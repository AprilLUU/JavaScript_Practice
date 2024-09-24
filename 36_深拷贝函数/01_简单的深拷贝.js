const s1 = Symbol()
const s2 = Symbol()


const obj = {
  name: 'why',
  friend: {
    name: 'kobe'
  },
  foo() {
    console.log('foo')
  },
  [s1]: 'abc',
  s2: s2,
  inner: obj
}

// JSON.stringify JSON.parse
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
  s2: s2
}

const obj1 = JSON.parse(JSON.stringify(obj))
console.log(obj1.friend === obj.friend)

// JSON.stringify JSON.parse
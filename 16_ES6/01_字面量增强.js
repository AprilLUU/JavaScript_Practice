let name = 'why'
let age = 18

let obj = {
  name,
  age,
  
  bar() {
    
  },

  baz: function() {

  },
  
  foo: () => {
    console.log(this)
  },

  [name + '123']: 'why'
}

export {}
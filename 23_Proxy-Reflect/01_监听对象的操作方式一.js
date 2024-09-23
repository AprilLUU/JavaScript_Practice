const obj = {
  name: 'why',
  age: 18
}

// Object.defineProperty(obj, 'name', {
//   enumerable: true, 
//   configurable: true,
//   get() {

//   },
//   set(newVal) {

//   }
// })

Object.keys(obj).forEach(key => {
  let _value = obj[key]
  Object.defineProperty(obj, key, {
    get() {
      return _value
    },  
    set(newValue) {
      _value = newValue
    }
  })
})
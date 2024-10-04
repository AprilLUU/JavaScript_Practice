const obj = {
  name: 'why',
  age: 18,
  friends: {
    name: 'kobe',
    age: 20
  },
  hobbied: ['fb', 'lq']
}

const jsonString = JSON.stringify(obj)

const info = JSON.parse(jsonString, (key, value) => {
  if (key === 'age') {
    return value - 1
  }
  return value
})

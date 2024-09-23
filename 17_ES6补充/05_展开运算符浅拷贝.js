const obj = {
  name: 'why',
  friend: {
    name: 'kobe',
    age: 18
  }
}

const info = { ...obj, name: 'coderwhy' }

console.log(obj.friend === info.friend)
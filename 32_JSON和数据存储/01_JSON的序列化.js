const obj = {
  name: 'why',
  age: 18,
  friends: {
    name: 'kobe',
    age: 20
  }
}

function obj2string(key, value) {
  const stringValue = JSON.stringify(value)
  localStorage.setItem(key, stringValue)
}

function string2obj(key) {
  const string = localStorage.getItem(key)
  return JSON.parse(string)
}
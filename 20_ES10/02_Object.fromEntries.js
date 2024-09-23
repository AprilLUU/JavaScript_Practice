const obj = {
  name: 'why',
  age: 18
}

const entries = Object.entries(obj)

const newObj = {}
for (const entry of entries) {
  newObj[entry[0]] = entry[1]
}

const newObj1 = Object.fromEntries(entries)

const queryString = 'name=why&age=18&height=1.88'
const queryParams = new URLSearchParams(queryString)
const queryObj = Object.fromEntries(queryParams)
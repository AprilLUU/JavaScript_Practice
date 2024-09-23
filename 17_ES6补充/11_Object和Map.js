const obj = {
  name: 'why',
  age: 18
}

const entries = Object.entries(obj)

const map = new Map(entries)

const mapEntries = map.entries()

const newObj = Object.fromEntries(mapEntries)

const isSameObj = Object.is(NaN, NaN)

console.log(entries)
console.log(map)
console.log(mapEntries)
console.log(newObj)
console.log(isSameObj)
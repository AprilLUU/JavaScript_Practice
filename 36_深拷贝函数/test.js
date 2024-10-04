const set = new Set()

let obj = { name: "lry" }
set.add(obj)

console.log([...set])
const set1 = new Set([...set])
console.log(set.has(obj), set1.has(obj))
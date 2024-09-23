const names = ['abc', 'cba', 'nba']
const iterator = names[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

const set = new Set()
const map = new Map()
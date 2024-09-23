const obj1 = {}
const obj2 = {}

//对象的key只能为字符串或者Symbol,key值是唯一的
const obj = {
  [obj1]: 'aaa', // '[object Object]': 'aaa'
  [obj2]: 'bbb'// '[object Object]': 'bbb'
}
// obj { '[object Object]': 'bbb' }

// map可以存放任意键
const map = new Map()
map.set(obj1, 'aaa')
map.set(obj2, 'bbb')
map.set(1, 'ccc')

const map1 = new Map([[obj1, 'aaa'], [obj2, 'bbb']])
const size = map1.size

const value = map1.get(obj1)
map1.has(obj1)
map1.delete(obj1)
map1.clear()

map1.keys()
map1.values()
map1.entries()

map1.forEach((value, key, map) => {
  console.log(`${key}: ${value}}`)
})

for (const [key, value] of map1) {
  console.log(`${key}: ${value}}`)
}
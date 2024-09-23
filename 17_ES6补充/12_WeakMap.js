const obj = {}

const map = new Map()

map.set(obj, 'aaa')
// WeakMap的key只能为对象类型，且为弱引用
const wm = new WeakMap()
wm.set(obj, 'aaa') 
wm.get(obj)
wm.has(obj)
wm.delete(obj)
// WeakMap不能进行遍历

const obj1 = {
  name: 'why',
  age: 18
}

function obj1NameFn1() {}
function obj1NameFn2() {}
function obj1AgeFn1() {}
function obj1AgeFn2() {}

const obj2 = {
  name: 'kobe'
}

function obj2NameFn1() {}
function obj2NameFn2() {}

const weakMap1 = new WeakMap()
const map1 = new Map()
weakMap1.set(obj, map1)
map1.set('name', [obj1NameFn1, obj1NameFn2])
map1.set('age', [obj1AgeFn1, obj1AgeFn2])

const map2 = new Map()
weakMap1.set(obj, map2)
map2.set('name', [obj2NameFn1, obj2NameFn2])

obj1.name = 'coderwhy'
const targetMap = weakMap1.get(obj1)
const fns = targetMap.get('name')
fns.forEach(fn => fn())

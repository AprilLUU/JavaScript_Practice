const set = new Set()

// 不可以添加重复元素
set.add(10)
set.add(20)
set.add(20)

set.add({})
set.add({})

const obj = {}

set.add(obj)
set.add(obj)

const size = set.size
set.delete(10)
const flag = set.has(10)

set.forEach(item => {
  console.log(item)
})

for (const item of set) {
  console.log(item)
}

set.clear()
// 数组去重
const arr = [10, 10, 20, 20, 30, 40]

const arrSet = new Set(arr)
const newArr = Array.from(arrSet) 
const newArr1 = [...arrSet]
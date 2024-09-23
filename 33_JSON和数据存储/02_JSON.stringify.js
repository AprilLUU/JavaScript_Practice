const obj = {
  name: 'why',
  age: 18,
  friends: {
    name: 'kobe',
    age: 20
  },
  hobbied: ['fb', 'lq'],
  // 如果有toJSON方法，stringify直接调用这个方法
  toJSON() {
    return 'obj2json'
  }
}

const jsonString1 = JSON.stringify(obj)
// 只转换对应的属性
const jsonString2 = JSON.stringify(obj, ['name', 'friends'])
// 对转换的内容进行自定义
const jsonString3 = JSON.stringify(obj, (key, value) => {
  if (key === 'age') {
    return value + 1
  }
  return value
})
// 转换的格式
const jsonString4 = JSON.stringify(obj, null, 2)
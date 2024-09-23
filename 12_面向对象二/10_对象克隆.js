const p = {
  name: 'why',
  friend: {
    name: 'kobe'
  }
}

const pProto = Object.getPrototypeOf(p)
const pPropsDesc = Object.getOwnPropertyDescriptors(p)

const cloneP = Object.create(pProto, pPropsDesc) //浅拷贝
const cloneP1 = Object.assign({}, p) //浅拷贝

const cloneP2 = JSON.parse(JSON.stringify(p)) //深拷贝
function deepClone(obj) {
  if (typeof obj !== 'object') {
    throw new Error('必须传入一个对象')
  }

  const cloneObj = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      cloneObj[key] = deepClone(obj[key])
    } else {
      cloneObj[key] = obj[key]
    }   
  }

  return cloneObj
}

const cloneP3 = deepClone(p)

console.log(cloneP3)
console.log(cloneP1)
console.log(cloneP2)
console.log(cloneP, cloneP === p)

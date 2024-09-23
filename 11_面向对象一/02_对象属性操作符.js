/**
 * 通过字面量定义时也有对应的属性描述符
 * value：所赋的值
 * enumerable: true
 * configurable: true
 * wirtable: true
 */

let obj = {
  name: 'why',
  _age: 18
}

const keys = Object.keys(obj)
keys.forEach(key => {
  Object.defineProperty(obj, key, {
    //能否枚举 能否打印 或者 通过for in遍历 或者 Object.keys()获取 默认值false
    enumerable: true,
    //能否配置 能否通过delete操作符删除 默认值false
    configurable: true,
    //能否修改 能否修改该属性的值 默认值false
    writable: true,
    value: obj[key], // 默认值undefined
  })
})

//数据属性描述符
Object.defineProperty(obj, 'name', {
  //能否枚举 能否打印 或者 通过for in遍历 或者 Object.keys()获取 默认值false
  enumerable: true,
  //能否配置 能否通过delete操作符删除 或通过Object.defineProperty重新定义 默认值false
  configurable: true,
  //能否修改 能否修改该属性的值 默认值false
  writable: true,
  value: obj[key], // 默认值undefined
})

//存取属性描述符
// 隐藏私有属性 截获该属性的访问和设置
Object.defineProperty(obj, 'age', {
  enumerable: true,
  configurable: true,
  get() {
    return this._age
  },
  set(newValue) {
    this._age = newValue
  }
})

Object.getOwnPropertyDescriptor(obj, 'name')
Object.getOwnPropertyDescriptors(obj)

const obj1 = {
  _age: 18,

  set age(value) {
    this._age = value
  },

  get age() {
    return this._age
  }
}

Object.defineProperties(obj, {
  name: {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'why'
  },
  // age: {
  //   enumerable: true,
  //   configurable: true,
  //   get() {
  //     return this._age
  //   },
  //   set(value) {
  //     this._age = value
  //   }
  // }
})
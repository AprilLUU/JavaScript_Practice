let arr = new Array(1, 2, 3) //let arr = [1, 2, 3]

/**
 * 内建类之间没有继承对应的静态方法和静态属性
 * 即Array.__proto__ !== Object
 * 没有Array.keys()这些方法
 */

class MyArray extends Array {
  firstItem() {
    return this[0]
  }

  lastItem() {
    return this[this.length - 1]
  }
  /**
   * species 种类
   * Symbol.species (不指定时默认返回子类型)
   * 即let arr = new MyArray(1, 2, 3)
   * arr.filter(...)默认返回MyArray对象
   * 当调用内置类原型上的方法时返回的对象类型
   * 
   */
  static get [Symbol.species]() {
    //  return this.constructor (default return) 
    // 显示指定时会返回对应的构造器类型 即arr.filter(...)返回Array对象
    return Array 
  }
}

let arr1 = new MyArray(1, 2, 3)
let newArr = arr1.filter(item => item > 1)
console.log(typeof newArr, newArr)
console.log(newArr.firstItem()) // Error
console.log(arr1.firstItem(), arr1.lastItem())
console.log(MyArray.__proto__ === Array)
console.log(MyArray.isArray(arr1))



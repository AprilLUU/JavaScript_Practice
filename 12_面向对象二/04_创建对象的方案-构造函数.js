/**
 * 
 * @param {string} name 
 * @param {number} age 
 * 缺点： 浪费内存，对象的方法放在原型上
 */

function Person(name, age) {
  this.name = name
  this.age = age
  this.eating = function() {
    console.log(this.name + 'eating')
  }
}

const p1 = new Person('why', 18)
const p2 = new Person('kobe', 21)

console.log(p1.eating === p2.eating) //false
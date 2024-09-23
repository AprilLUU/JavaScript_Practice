const obj = {
  name: 'why'
}

const obj1 = {
  address: 'gz'
}

Object.defineProperty(obj, 'age', {
  enumerable: false
})

obj.__proto__ = obj1

/**
 * for in 会遍历对象及其原型链上的所有可枚举属性
 * Object.keys() Objecy.values()会忽略继承的属性
 * 在现代引擎中，从性能的角度来看，我们是从对象还是从原型链获取属性都是没区别的。
 * 它们（引擎）会记住在哪里找到的该属性，并在下一次请求中重用它。
 * 例如，对于 pockets.glasses 来说，它们（引擎）会记得在哪里找到的 glasses（在 head 中），这样下次就会直接在这个位置进行搜索。
 * 并且引擎足够聪明，一旦有内容更改，它们就会自动更新内部缓存，因此，该优化是安全的。
 */
for (const key in obj) {
  console.log(key) // name adress
  const flag = obj.hasOwnProperty(key)
  if (flag) {
    console.log(key) //name
  }
}

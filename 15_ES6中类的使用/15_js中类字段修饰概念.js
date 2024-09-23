/**
 * _开头的属性代表受保护的属性，只能在类内部及其扩展类中访问，可以被继承，提供相应的getter，setter
 * #开头的属性代表私有属性，只能在类内部访问，不能被继承
 * 只读属性，只提供对应的getter
 */

class Person {
  _name = 'coderwhy'
  #age = 18
  _height = 1.88

  get name() {
    return this._name
  }

  set name(value) {
    this._name = value
  }

  get height() {
    return this._height
  }
}
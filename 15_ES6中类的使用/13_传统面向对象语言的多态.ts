/**
 * 多态: 不同的数据类型执行同一操作时，表现出来的行为不一样
 * 传统面向对象实现多态的前提
 * 必有继承
 * 必有重写
 * 父类引用指向子类对象
 */


class Shape {
  getArea() {}
}

class Rectange extends Shape {
  getArea() {
    return 100
  }
}

class Circle extends Rectange {
  getArea() {
    return 200
  }
}

function calcArea(shape: Shape) {
  console.log(shape.getArea())
}

const r = new Rectange()
const c = new Circle()
calcArea(r)
calcArea(c)
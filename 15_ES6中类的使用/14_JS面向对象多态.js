function calcArea(foo) {
  console.log(foo.getArea())
}

const obj = {
  getArea() {
    console.log('object')
  }
}

class Person {
  getArea() {
    console.log('person')
  }
}

const p = new Person()

calcArea(obj)
calcArea(p)

function sum(n1, n2) {
  return n1 + n2
}

sum(20, 30)
sum('abc', '123')

/**
 * 不同数据类型执行同一操作，会有不同的表现，即为多态。
 */
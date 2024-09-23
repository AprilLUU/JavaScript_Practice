/**
 * 不能确定对象的明确类型
 */

function createPerson(name, age) {
  let p = {}
  p.name = name
  p.age = age
  p.eating = function() {
    console.log(this.name + 'eating')
  }

  return p
}

let p1 = createPerson('zs', 18)
let p2 = createPerson('ls', 19)
let p3 = createPerson('ww', 20)
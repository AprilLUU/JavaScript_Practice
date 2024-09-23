function add(x, y, z) {
  return x + y + z
}

function sum1(x) {
  return function(y) {
    return function(z) {
      return x + y + z
    }
  }
}

let sum2 = x => y => z => x + y + z

let sum3 = x => {
  return y => {
    return z => {
      return x + y + z
    }
  }
}

add(10, 20, 30)
sum1(10)(20)(30)
sum2(10)(20)(30)
sum3(10)(20)(30)

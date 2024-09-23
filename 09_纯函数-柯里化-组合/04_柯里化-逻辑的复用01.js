function sum(n, m) {
  return n + m
}

sum(5, 10)
sum(5, 100)
sum(5, 1000)

function makeAdder(n) {
  n = n * n

  return function(count) {
    return count + n
  }
} 

const add5 = makeAdder(5)
add5(10)
add5(100)
add5(1000)
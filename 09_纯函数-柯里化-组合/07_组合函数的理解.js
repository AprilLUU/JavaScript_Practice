function double(n) {
  return n * 2
}

function square(n) {
  return n * n
}

square(double(10))

function composeFn(fn1, fn2) {
  return function(count) {
    return fn1(fn2(count))
  }
}

let newFn = composeFn(square, double)
newFn(10)
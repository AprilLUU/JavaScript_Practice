function createFnArray() {
  // 占据的空间为： 4 * 1024 * 1024 = 4M
  var arr = new Array(1024 * 1024).fill(1)
  return function() {
    console.log(arr.length)
  }
}

// var arrFn = createFnArray()
// arrFn()
/**
 * GC会定时巡视有没有可回收的内存
 */
var arrFns = []
for (var i = 0; i < 100; i++) {
  setTimeout(() => {
    arrFns.push(createFnArray())
  }, i * 100)
}

setTimeout(() => {
  for (var i = 0; i < 50; i++) {
    setTimeout(() => {
      arrFns.pop()
    }, i * 100)
  }
}, 10000)

//arrFn = null
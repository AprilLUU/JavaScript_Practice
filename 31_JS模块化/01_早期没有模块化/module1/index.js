var module1 = (function () {
  var name = 'kobe'
  var isFlag = false

  return {
    name: name,
    isFlag: isFlag
  }
})

if (module1.isFlag) {
  console.log(module1.name)
}
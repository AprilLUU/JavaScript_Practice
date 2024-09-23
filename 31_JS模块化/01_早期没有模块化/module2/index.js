var module2 = (function () {
  var name = 'why'
  var isFlag = true

  function printName() {
    if (isFlag) {
      console.log(name)
    }
  }

  return {
    printName: printName
  }
})()

module2.printName()


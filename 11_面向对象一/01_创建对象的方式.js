//创建方式一： new Objcet()
let obj = new Object()
obj.name = 'why'
obj.running = function() {
  console.log(this.name + 'running')
}

//创建方式二: 字面量
let obj1 = {
  name: 'why',
  running() {
    console.log(this.name + 'running')
  }
}


/**
 * 箭头函数不会绑定this，只会到父作用域词法环境(执行上下文)中寻找this
 */


// let foo = () => ({ name: 'why' }) //返回一个对象的简写

let foo = () => {
  console.log('foo', this)
}

foo.call({})
foo.bind({})()

let obj = {
  getData() {
    // var _this = this
    // setTimeout(function(res) {
    //   _this.data = res.data
    // }, 0)
    const res = { data: 0 }
    console.log('getData')
    setTimeout(() => {
      console.log('setTimeout')
      this.data = res.data
    }, 0)
  }
}

obj.getData()
foo()
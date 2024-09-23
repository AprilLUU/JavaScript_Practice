class Button {
  constructor(value) {
    this.value = value
  }
  
  /**
   * 定义这种箭头函数会把方法添加到每个实例对象上(子类继承的时候也会继承相应的方法，添加到实例对象上，而非原型对象上)
   * 箭头函数会找到父作用域下的this 即Button构造函数中的this
   * 相当于
   * function Button() {
   *  this.value = value
   *  this.click = () => {...} //当前this绑定为new创建出来的对象
   * }
   */
  click = () => {
    console.log(this.value)
  }
  
  showTest() {
    console.log('test')
  }
}

class MyButton extends Button {
  constructor(value) {
    super(value)
  }

  showMessage() { 
    super.showTest()
    setTimeout(() => {
      super.showTest() // 箭头函数也没有super指针，会往父作用域寻找
    }, 0)
  }


}

const button = new Button('testButton')
const myButton = new MyButton('testMyButton')

setTimeout(button.click, 1000) // button

console.log(Object.getOwnPropertyDescriptors(button))
button.click()
myButton.click()
myButton.showMessage()

const obj = {
  test: () => { console.log(this) }
}

obj.test()
function createClass() {
  return class {
    sayHello() {
      console.log('hello world')
    }
  }
}

class Hello extends createClass() {

}

new Hello().sayHello()
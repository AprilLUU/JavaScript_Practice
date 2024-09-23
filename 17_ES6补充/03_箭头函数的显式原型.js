const foo = () => {

}

// 箭头函数没有原型，不能作为构造器使用
console.log(foo.prototype)
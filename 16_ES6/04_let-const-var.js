var age = 18
var age = 20

let height = 1.88
// let height = 2 //Error 不可以重复声明

/**
 * 1. var声明的变量可以在声明前使用(作用域提升)
 *    console.log(age)
 *    var age = 18
 * 2. let/const 声明的变量在执行上下文被创建时也会被创建，
 *    只是在没有赋值之前不能被访问
 *    console.log(age) //Error
 *    let age
 *    age = 18
 * 3. var可以重复声明变量, let和const不行
 * 4. var没有块级作用域，let和const有
 */
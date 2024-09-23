// import { name as fName, age as fAge, foo as fFoo } from './foo.js'
import { name, age, foo } from './foo.js' // 同步代码
// import * as foo from './foo.js' 
// foo.name foo.age foo.foo()
import('./foo.js').then(res => {
  console.log(res, res.name, res.age)
}) // 异步代码

//meta.url 当前模块所在的路径
console.log(import.meta)


console.log(name)
console.log(age)
console.log(foo())
// console.log(sum(10, 20))
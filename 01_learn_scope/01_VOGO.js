/**
 * 1. 代码被解析，解析过程V8引擎内部会帮助我们创建一个全局对象
 *    包括内建类Math，setTimeout, console对象,以及全局属性，函数等等
 * 2. 运行代码（将代码从磁盘加载到内存中去执行）
 *  2.1 V8为了执行代码，会在内部有一个执行上下文栈（Exectution Context Stack ECS)(函数调用栈)
 *    2.1.1 ECS里面执行代码需要有上下文
 *  2.2 因为我们执行的是全局代码，为了能正常运行，V8引擎会创建全局执行上下文（Global Exectution Context)
 *      (全局代码需要执行才需要创建)
 *    2.2.1 GEC会入栈ECS，在ESC中GEC会创建一个VO（Variable Object)对象，指向GO对象
 *    2.2.2 一行一行地执行全局代码, 通过VO找到GO的name属性，赋值为why等
 */
 var name = 'why'
 console.log(name) // 通过VO找到GO的name属性，已赋值为why 
 console.log(num1) // 通过VO找到GO的num1属性,未赋值, undefined
 var num1 = 20

 /**
  * 解析阶段创建GO, 此时代码未执行，所以添加的属性为undefined
  */
var GlobalObject = {
  String,
  setTimeout,
  ...{},
  window: this,
  name: undefined,
  num1: undefined
}

export {}

/**
 * 每个执行上文下文都会关联一个变量环境(词法环境VE)，在执行代码中变量和函数的声明都会作为环境记录(ER)添加到变量环境中
 * 对于函数上下文来说，参数也会作为记录添加到环境中
 */


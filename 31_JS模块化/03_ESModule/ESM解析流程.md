### ESM解析流程

1. 构建阶段

   1.1 根据URL下载main.js/index.js文件，进行静态分析(解析对应的import和export语句)，解析成Module Recored（模块记录），模块记录有一个RequestedModules属性，记录着引用的模块

   1.2 根据URL下载引用的模块，重复之前的操作

   1.3 下载模块时，浏览器会维护一个Map，记录URL与对应的模块记录（下载中也会记录下载中的状态），当遇到不同模块引用同一模块时，仅在第一次去下载对应的js文件，第二次开始使用缓存

   1.4 静态分析，即不会执行代码模块导入需在脚本顶层，不会动态导入

   ```javascript
   if (isModule) {
       import ... from ... // 不会生效
   }
   ```

   1.5 模块代码仅在第一次导入执行，多次导入只会执行一次

2. 实例化阶段

   2.1 将对应的Module Record（Module Record有一个LocalExport记录着导出的对象等，有一个ImportEntries记录着引用的对象等）实例化成Module Environment Recored

   2.2 Module Environment Recored有一个Bindings记录着绑定的属性

   2.3 模块导出的属性在内存开辟一块空间保存着对应的属性

   2.4 将对应的属性赋值为undefined

3. 求值阶段

   3.1 运行模块中的代码，给导出的属性赋值

   3.2 模块可以修改导出的对应的属性，模块无法修改导入模块的属性
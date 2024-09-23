// 模块在第一次加载到内存中会被执行，然后会缓存，之后再进行加载会使用缓存，不会执行
// require是运行时加载，当模块之间互相依赖，就会形成依赖图，采用的是深度优先搜索

console.log('main start')

require('./test.js')

console.log('main end')

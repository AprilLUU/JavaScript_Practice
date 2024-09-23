## JS引擎垃圾回收器内存管理

#### GC算法--引用计数

记录对象的引用数，值为0时就将其回收。

```javascript
let obj = {} //记录obj的引用值count为1
obj = null //记录obj的引用值count为0 将其回收
```

缺点：无法解决循环引用问题

```javascript
let obj1 = {value: obj2} // obj1 count为2
let obj2 = {value: obj1} // obj2 count为2
obj1 = obj2 = null // obj1 obj2 count为1 无法回收
```

#### GC算法--标记清除

1.从一个根出发（Global Object），遍历并标记其他对象的引用

2.继续遍历标记的引用的对象，遍历并标记这个对象中对其他对象的引用

3.只要能被访问标记，就称之为可达的，反之，不被标记的对象都会被清除

[https://zh.javascript.info/garbage-collection#xiang-hu-guan-lian-de-dui-xiang]()


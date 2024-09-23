setTimeout(function() {
  console.log(this) //严格与非严格模式下 都是指向window 内部源码 fn.apply(window)
}, 0)

//DOM事件监听器this为元素本身

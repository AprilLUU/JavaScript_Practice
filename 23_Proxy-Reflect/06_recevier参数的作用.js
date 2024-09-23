const obj = {
  _name: 'why',
  get name() {
    console.log(this === proxy)
    return this._name
  },
  set name(newName) {
    this._name = newName
  },
  showName() {
    console.log(this)
    console.log(this._name)
  }
}

const proxy = new Proxy(obj, {
  get(target, key, recevier) {
    /**
     * recevier参数的作用
     * 1. recevier即为obj的代理对象proxy
     * 2. 通过Reflect传入recevier会改变原始对象的getter/setterthis值，this === recevier
     * 3. 即在obj对象中访问this.xxx也会被代理对象劫持,来到代理对象的捕获器去执行
     * 4. 即可以捕获在任意地方对obj对象的操作
     */
    console.log(key + ' -------')
    console.log(recevier === proxy)
    return Reflect.get(target, key, recevier)
  },
  set(target, key, newValue, recevier) {
    console.log(key, '-------')
    return Reflect.set(target, key, newValue, recevier)
  }
})

// proxy.name -> proxy get(key) -> Reflect(key) -> get obj(key) -> return obj._name
console.log(proxy.name)

proxy.name = 'kobe'
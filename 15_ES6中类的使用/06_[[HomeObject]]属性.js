class Person {
  eating() {
    //[[HomeObject]] == PersonInstance
    console.log('person eating')
  }
}

class Student extends Person {
  eating() {
  /**
   * 为了提供解决方法，JavaScript 为函数添加了一个特殊的内部属性：[[HomeObject]]。
   * 当一个函数被定义为类或者对象方法时，它的 [[HomeObject]] 属性就成为了该对象。
   * [[HomeObject]]指向当前调用该方法的对象 用来寻找super指针
   * https://zh.javascript.info/class-inheritance#shen-ru-nei-bu-tan-jiu-he-homeobject
   * [[HomeObject]] 是为类和普通对象中的方法定义的。但是对于对象而言，方法必须确切指定为 method()，而不是 "method: function()"。
   * 这个差别对我们来说可能不重要，但是对 JavaScript 来说却非常重要。
   */
    super.eating() //[[HomeObject]] == StudentInstance
    console.log('student eating')
  }
}

const stu = new Student()
stu.eating()

const animal = {
  eat() {
    console.log('eat')
  }
}

const rabbit = {
  __proto__: animal,
  eat() {
    this.__proto__.eat.call(this) 
  }
}

const longEar = {
  __proto__: animal,
  eat() {
    this.__proto__.eat.call(this) 
  }
}

/**
 * 递归调用
 * eat方法里的this == longEar this.__proto__ == rabbit
 * rabbit.eat.call(this)
 * rabbit.eat方法里的this对象仍为longEar
 */
longEar.eat()

//在 JavaScript 语言中 [[HomeObject]] 仅被用于 super。
//所以，如果一个方法不使用 super，那么我们仍然可以视它为自由的并且可在对象之间复制。
//但是用了 super 再这样做可能就会出错。

let animal1 = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit 继承自 animal
let rabbit1 = {
  __proto__: animal1,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

// tree 继承自 plant
let tree = {
  __proto__: plant,
  sayHi: rabbit.sayHi // (*)
};

tree.sayHi();  // I'm an animal (?!?)
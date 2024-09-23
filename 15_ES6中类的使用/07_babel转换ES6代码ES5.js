class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log('eating')
  }
}

"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

/**
 *  魔法标记 标记为纯函数(纯函数是没有任何副作用的函数)
 *  当这个纯函数没有任何运用时可以直接删除
 *  为了更方便的配合构建工具进行tree-shaking
 *  立即执行函数 包裹一个函数作用域 里面的变量不会跟全局进行冲突
 */
var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [
    {
      key: "eating",
      value: function eating() {
        console.log("eating");
      }
    }
  ]);

  return Person;
})();
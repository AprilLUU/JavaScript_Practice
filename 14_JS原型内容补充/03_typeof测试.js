function Person() {}

const p = new Person()

/**
 * string number symbol object boolean bigint function undefined
 */
console.log(typeof p)

console.log(p.__proto__.constructor.name)
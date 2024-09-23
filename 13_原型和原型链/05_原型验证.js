const obj = {

}

obj.__proto__ = { friends: [] }

obj.friends.push('lisi')
obj.friends = []

console.log(obj.friends, obj.__proto__)
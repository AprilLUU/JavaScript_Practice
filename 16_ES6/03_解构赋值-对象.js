let obj = {
  name: 'why',
  age: 18,
  height: 1.88
}

let { name, age, height } = obj

// let { age } = obj

let { name: newName } = obj

let { address: newAddress = 'gz'} = obj

console.log(newAddress)
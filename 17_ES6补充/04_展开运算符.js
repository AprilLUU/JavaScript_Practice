const names = ['abc', 'cba', 'nba']
const name = 'why'

function foo(...args) {
  console.log(...args)
}

foo(...names)
foo(...name)

const newNames = [...names, ...name]

const info = { name: 'why', age: 18 }
const obj = {...info, adress: 'gz'}

const names = ['abc', 'cba', 'nba']

for (let i = 0; i < names.length; i++) {
  console.log(i)
}

//不可以使用const
for (const i = 0; i < names.length; i++) {
  console.log(i)
}

{
  const i = 0
  console.log(i)
  i++ // error
}

for (const name of names) {
  console.log(name)
}
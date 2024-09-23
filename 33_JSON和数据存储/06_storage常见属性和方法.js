localStorage.setItem('name', 'why')
localStorage.setItem('age', 18)

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  console.log(localStorage.getItem(key))
}

localStorage.removeItem('name')
localStorage.clear()
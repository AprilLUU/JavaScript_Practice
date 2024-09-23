let reactiveFns = []

function watchFn(fn) {
  reactiveFns.push(fn)
}

const obj = {
  name: 'why',
  age: 18
}

watchFn(function() {
  console.log('name change one time')
})

watchFn(() => {
  console.log('name change two times')
})

obj.name = 'kobe'
reactiveFns.forEach(fn => fn())
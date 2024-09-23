const dbRequest = indexedDB.open('test', 2)

dbRequest.onerror = function() {
  console.log('connect error')
}

let db = null
dbRequest.onsuccess = function(event) {
  db = event.target.result
}

// 第一次打开或者版本更新时回调
dbRequest.onupgradeneeded = function(event) {
  const db = event.target.result
  db.createObjectStore('users', { keyPath: 'id' })
}

class User {
  constructor(id, name, age) {
    this.id = id
    this.name = name
    this.age = age
  }
}

const users = [
  new User(1, 'why', 18), 
  new User(2, 'kobe', 20), 
  new User(3, 'james', 30)
]

const btns = document.getElementsByTagName('button')

for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    const transaction = db.transaction('users', 'readwrite')
    const store = transaction.objectStore('users')
    switch(i) {
      case 0:
        for (const user of users) {
          const request = store.add(user)
          request.onsuccess = function() {
            console.log(`${user.name} insert success`)
          }
        }
        transaction.oncomplete = function() {
          console.log('add all success')
        }
        break
      case 1:
        const deleteRequest = store.openCursor()
        deleteRequest.onsuccess = function(event) {
          const cursor = event.target.result
          if (cursor) {
            if (cursor.key === 2) {
              cursor.delete()
              console.log('delete success')
            } else {
              console.log('continue')
              cursor.continue()
            }
          } else {
            console.log('delete error')
          }
        }
        break
      case 2:
        const updateRequest = store.openCursor()
        updateRequest.onsuccess = function(event) {
          const cursor = event.target.result
          if (cursor) {
            if (cursor.key === 2) {
              const value = cursor.value
              value.name = 'coderwhy'
              cursor.update(value)
              console.log('update success')
            } else {
              console.log('continue')
              cursor.continue()
            }
          } else {
            console.log('update error')
          }
        }
        break
      case 3:
        // const request = store.get(2)
        // request.onsuccess = function(event) {
        //   console.log(event.target.result)
        // }
        const queryRequest = store.openCursor()
        queryRequest.onsuccess = function(event) {
          const cursor = event.target.result
          if (cursor) {
            console.log(cursor.key, cursor.value)
            cursor.continue()
          } else {
            console.log('query success')
          }
        }
        break
    }
  }
}
const info = {
  name: 'why',
  friend: {
    name: 'lilei',
    girlFriend: {
      name: 'hmm'
    }
  }
}

if (info && info.friend && info.friend.girlFriend) {
  console.log(info.friend.girlFriend.name)
}

console.log(info.friend?.girlFriend?.name)
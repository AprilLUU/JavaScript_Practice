function requestData(url, successCallBack, failureCallBack) {
  setTimeout(() => {
    let result
    if (url === 'baidu') {
      result = 'success'
      successCallBack(result)
    } else {
      result = 'error'
      failureCallBack(result)
    }
  })
}

requestData('baidu', res => {
  console.log(res)
}, err => {
  console.log(err)
})

function requestData1(url, successCallBack, failureCallBack) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result
      if (url === 'baidu') {
        result = 'success'
        resolve(result)
      } else {
        result = 'error'
        reject(result)
      }
    })
  })
}

requestData1('baidu')
  .then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
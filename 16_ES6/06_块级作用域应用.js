const btns = document.getElementsByTagName('button')

for (var i = 0; i < btns.length; i++) {
  (function(n) {
    btns[i].onclick = function() {
      console.log(n)
    }
  })(i)
}

for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    console.log(i)
  }
}
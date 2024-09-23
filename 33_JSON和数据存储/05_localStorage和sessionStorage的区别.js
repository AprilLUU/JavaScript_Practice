/**
 * localStorage在同一域下永久存储
 * sessionStorage在同一个会话下存储(同一个标签页下，在这个标签页跳转到一个新的URL也可以用，关闭标签页就清除)
 */

const btn = document.getElementById('btn')

btn.onclick = function() {
  localStorage.setItem('name', 'localStorage')
  sessionStorage.setItem('name', 'sessionStorage')
}
function handleArrParentToSon(arr) {
  //1. 定义一个映射表
  const map = new Map()
  //2. 定义一个结果数组
  const resultArr = [...arr]
  //3. 第一次遍历数组，给map存上 id => sonArr
  for (let i = 0; i < arr.length; i++) {
    const sonArr = []
    const id = arr[i].id
    map.set(id, sonArr)
  }
  //4. 第二次遍历数组
  for (let i = 0; i < arr.length; i++) {
    const pid = arr[i].pid
    //4.1 判断map里是否有父节点的子节点数组
    if (map.has(pid)) {
      //4.2 如果有，取出子节点数组，将对应的元素push进子节点数组中
      const sonArr = map.get(pid)
      sonArr.push(arr[i])
    }
  }
  //5. 第三次遍历数组
  for (let i = 0; i < arr.length; i++) {
    const id = arr[i].id
    //5.1 判断父节点的id是否为0，即父节点是否存在
    if (arr[i].pid !== 0) {
      //5.2 父节点不存在时，拿到这个元素在数组中的索引
      const index = resultArr.indexOf(arr[i])
      //5.3 删除对应的元素
      resultArr.splice(index, 1)
    }
    // 5.4 判断父节点的子节点数组是否存在
    if (map.has(id)) {
      // 5.5 拿到子节点数组
      const sonArr = map.get(id)
      // 5.6 判断子节点是否为空
      if (sonArr.length) {
        // 5.7 不为空，赋值给这个节点的sons
        arr[i].sons = sonArr
      }
    }
  }

  return resultArr
}

const srcArr = [
  { id: 1, pid: 0}, 
  { id: 2, pid: 0}, 
  { id: 3, pid: 1}, 
  { id: 4, pid: 1}, 
  { id: 5, pid: 2}, 
  { id: 6, pid: 5}, 
  { id: 7, pid: 6},
]

const arr = handleArrParentToSon(srcArr)
console.log(arr)

function handleArrToParentAndSon(srcArr){
  // let result = [];
  let parents = srcArr.filter( item => item.pid === 0)
  let children = srcArr.filter( item => item.pid !== 0)
  function getParent(parents, child) {
    const parent = parents.find(item => item.id === child.pid)
    if(parent) {
      parent.son = parent.son ? parent.son : [];
      parent.son.push({
        id: child.id,
        pid: parent.id
      })
      return ;
    }
    // 没有找到，递归
    getParent(children, child);
  }
  getParent(parents, children[0]);
  return parents;
}
let names = ['cba', 'abc', 'nba']

// let item1 = names[0]
// let item2 = names[1]
// let item3 = names[2]

let [item1, item2, item3] = names

let [, item4, item5] = names // 解构后两个元素

let [item6, ...newNames] = names

let [item7, item8, item9, item10 = 'why'] = names
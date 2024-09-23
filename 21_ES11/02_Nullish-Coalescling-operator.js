const foo = undefined // 0 '' null NaN
const bar = foo || 'default value'

const bar1 = foo ?? 'default value'
function log(date, type, message) {
  console.log(`
    [${date.getHours()}:${date.getMinutes()}]
    [${type}]
    [${message}]
  `)
}

let log1 = date => type => message => {
  console.log(`
    [${date.getHours()}:${date.getMinutes()}]
    [${type}]
    [${message}]
  `)
} 

let nowLog = log(new Date())
nowLog('DEBUG')('bug')
nowLog('FETURE')('feture')

let nowDebugLog = log(new Date())('DEBUG')
let nowFetureLog = log(new Date())('FETURE')

nowDebugLog('debug')
nowFetureLog('feture')
const names = ['abc', 'cba', 'nba', NaN]

if (names.indexOf('cba') !== -1) {
  console.log('include cba')
}

if ( names.includes('cba', 0)) {
  console.log('include cba')
}

if (names.indexOf(NaN) !== -1) {
  console.log('include NaN')
}

if ( names.includes(NaN, 0)) {
  console.log('include NaN')
}
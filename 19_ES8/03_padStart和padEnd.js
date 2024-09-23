const message = 'Hello World'

const newMessage = message.padStart(15, '*').padEnd(20, '-')

const cardNumber = '12131231231232133123'
const lastFourCardNum = cardNumber.slice(-4)
const finalCardNumber = lastFourCardNum.padStart(cardNumber.length, '*')
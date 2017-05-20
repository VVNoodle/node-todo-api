const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// var message = "Hello, Worldd!";
// var hash = SHA256(message).toString();

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);
var decoded = jwt.verify(token, '123abc');
console.log(decoded);

// console.log(hash);
//
// var data = {
//   id: 4
// }
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (token.hash === resultHash) {
//   console.log('Works!');
// }

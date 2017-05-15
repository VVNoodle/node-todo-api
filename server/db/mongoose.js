//  C:\Program Files\MongoDB\Server\3.4\bin
//  C:\Users\Brick\mongo-data
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
module.exports = {mongoose};

// module.exports.mongoose = mongoose; 

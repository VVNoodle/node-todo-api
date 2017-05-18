//  C:\Program Files\MongoDB\Server\3.4\bin
//  mongod --dbpath="C:\Users\Brick\mongo-data"
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
module.exports = {mongoose};

// module.exports.mongoose = mongoose;

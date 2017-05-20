//  C:\Program Files\MongoDB\Server\3.4\bin
//  mongod --dbpath="C:\Users\Brick\mongo-data"

//  cd /d D:\MongoDB\Server\3.4\bin
//  mongod.exe --dbpath D:\mongo-data
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
module.exports = {mongoose};
// module.exports.mongoose = mongoose;

//C:\Program Files\MongoDB\Server\3.4\bin
//C:\Users\Brick\mongo-data
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server!');

  // db.collection('Todo').findOneAndUpdate(
  //   {_id: new ObjectID("59188099e3d11a316958f25b")},
  //   {$set:{completed: false}},
  //   {returnOriginal: false}
  // ).then((result)=>{
  //   console.log(result);
  // });

  // db.collection('Users').findOneAndUpdate(
  //   {name: 'Ben'},
  //   {$set:{age: 19}},
  //   {returnOriginal: false}
  // ).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate(
    {name: 'Ben'},
    {$inc: {age: 1}},
    {returnOriginal: false})
    .then((result)=>{
      console.log(result);
    })

  // db.close();
});

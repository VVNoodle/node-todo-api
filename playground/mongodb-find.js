//C:\Program Files\MongoDB\Server\3.4\bin
//C:\Users\Brick\mongo-data
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server!');

  db.collection('Todo').find().count().then((count)=>{
    console.log(`Todo count: ${count}\n`);
  }, (err)=>{
    console.log('Unable to fetch todos', err);
  });

  //list
  db.collection('Users').find({name: 'Egan'}).toArray().then((docs)=>{
    console.log(`Users:`);
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err)=>{
    console.log('Unable to fetch todos', err);
  });

  //count
  db.collection('Users').find({name: 'Egan'}).count().then((count)=>{
    console.log(`User count: ${count}`);
  }, (err)=>{
    console.log('Unable to fetch todos', err);
  });

  db.close();
});

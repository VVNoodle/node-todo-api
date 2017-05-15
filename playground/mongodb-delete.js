//C:\Program Files\MongoDB\Server\3.4\bin
//C:\Users\Brick\mongo-data
const {MongoClient, ObjectID} = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server!');

  //deleteMany
  // db.collection('Todo').deleteMany({text:'Go to SlugCon'}).then((result)=>{
  //   console.log(result);
  // }, (err)=>{
  //
  // });

  //deleteOne
  // db.collection('Todo').deleteOne({text:'Save the world'}).then((result)=>{
  //   console.log(result);
  // }, (err)=>{
  //
  // });

  //findOneAndDelete
  // db.collection('Todo').findOneAndDelete({completed: false}).then((result)=>{
  //   console.log(result);
  // })

  db.collection('Users').deleteMany({name: 'Eggers'}).then((result)=>{
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({_id: new ObjectID(`123`)}).then((result)=>{
    console.log(result);
  });

  // db.close();
});

db.collection('Todo').insertOne({
  text: 'something urgent',
  completed: false,
  },
  (err, result)=>{
    if (err) {
      return console.log('Unable to insert todo, err');
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
});


db.collection('Users').insertOne({
  name: 'Egan',
  age: '18',
  location: 'UCSC'
}, (err, result)=>{
  if (err) {
    return console.log('Unable to insert users, err');
  }

  console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
});

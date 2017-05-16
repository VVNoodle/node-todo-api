const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '591a1fb88ed3801b40397a03';
//
// if (!ObjectID.isValid(id)) {
//   console.log(`ID not valid`);
// }else {
//   console.log(`ID valid`);
// }
//
// Todo.find({_id: id})
//   .then((todos)=>{
//     if (todos.length === 0) {
//       return console.log('id not found');
//     }
//     console.log('Todos, ', todos);
//   });
//
// Todo.findOne({completed: false})
//   .then((todo)=>{
//     if (!todo) {
//       return console.log('All todos are done');
//     }
//     console.log('Todo not completed, ', todo);
//   })
//
// Todo.findById(id)
//   .then((todo)=>{
//     if (!todo) {
//       return console.log('id not found');
//     }
//     console.log('Todo by ID, ', todo);
//   }).catch((err)=>{
//     console.log(err);
//   })

const id = '591929371b2f0f1b98752720';

User.findById(id)
  .then((user)=>{
    if (!user) {
      return console.log('No user found');
    }
    console.log(`User ${user.name} found:`);
    console.log(JSON.stringify(user, undefined, 2));
  }).catch((err)=>{
    console.log(err);
  })

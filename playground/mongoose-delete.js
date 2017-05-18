const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({})  <-- removes all collection

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findByIdAndRemove('591d41420135cf28c4093cec').then((todo)=>{
//   console.log(todo);
// });
//
// Todo.findOneAndRemove({todo: "eat breakfast"}).then((result)=>{
//   console.log(result);
// });

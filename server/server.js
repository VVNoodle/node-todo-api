var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res)=>{
  var todo = new Todo({
    todo:req.body.todo
  });

  todo.save().then((result)=>{
    res.send(result);
  }, (err)=>{
    res.send(400, err);
  });
}); //end POST

app.get('/todos', (req, res)=>{
  Todo.find().then((data)=>{
    res.send({todos: data});
  }).catch((err)=>{
    res.send(400, err);
  });
});

app.listen(3000, ()=>{
  console.log('Started on port 3000!');
})

module.exports = {app};

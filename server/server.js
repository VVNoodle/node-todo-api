var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {ObjectID} = require('mongodb');

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
}); //end POST /todos

app.get('/todos', (req, res)=>{
  Todo.find().then((data)=>{
    res.send({todos: data});
  }).catch((err)=>{
    res.send(400, err);
  });
});//end GET /todos

app.get('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then(
    (doc)=>{
      if(!doc){
        return res.status(404).send();
      }
      res.send({text: doc});
    },
    (err)=>{
      res.status(404).send();
    }
  )
}); //end GET /todos/:id

app.listen(3000, ()=>{
  console.log('Started on port 3000!');
})

module.exports = {app};

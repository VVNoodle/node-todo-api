var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {ObjectID} = require('mongodb');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res)=>{
  var todo = new Todo({todo: req.body.todo});

todo.save().then((result)=>{

    res.send(result);
  }).catch((err)=>{
    res.status(400).send(err);
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
    (todo)=>{
      if(!todo){
        return res.status(404).send();
      }
      res.send(JSON.stringify({todo}, undefined, 2));
    },
    (err)=>{
      res.status(404).send();
    }
  )
}); //end GET /todos/:id

app.delete('/todos/:id', (req,res)=>{
  //get id
  const id = req.params.id;
  //validate id. if not valid, return 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //remove todo by id
    //success: if no doc, send 404, if doc send it back w/ 200
    //error: send 400 w/ empty body
  Todo.findByIdAndRemove(id).then((result)=>{
    if(!result){
      return res.status(404).send();
    }
    res.status(200).send({todo: result});
  }).catch((err)=>{
    res.status(400).send();
  });
});

app.listen(port, ()=>{
  console.log(`Started on port ${port}!`);
})

module.exports = {app};

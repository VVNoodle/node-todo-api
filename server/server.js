const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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
}); //end DELETE

app.patch('/todos/:id', (req, res)=>{
  const id = req.params.id;
  var body = _.pick(req.body, ['todo', 'completed'])//where updates are stored

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(
    {_id : id},
    {$set: body},
    {new: true})
    .then((result)=>{
      if(!result){
        return res.status(404).send();
      }
      res.status(200).send(result);
    }).catch((err)=>{
      res.status(400).send(err);
    });
});

app.listen(port, ()=>{
  console.log(`Started on port ${port}!`);
})

module.exports = {app};

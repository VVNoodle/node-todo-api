const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'test@example.com',
  password: 'wrongpassword',
  tokens: [{
    access:'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
},{
  _id: userTwoId,
  email:'wrong@hotmail.com',
  password: '12345678',
  tokens: [{
    access:'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
},{
  _id: userThreeId,
  email:'last@hotmail.com',
  password: 'testtest',
  tokens: [{
    access:'auth',
    token: jwt.sign({_id: userThreeId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(()=>done());
};

const todos = [{
    _id: new ObjectID(),
    todo: 'Go for a walk',
    _creator: userOneId
  },{
    _id: new ObjectID(),
    todo: 'eat lunch',
    _creator: userTwoId
  },{
    _id: new ObjectID(),
    todo: 'Attend lecture',
    completed: true,
    completedAt: 2,
    _creator: userThreeId
  }
];

const populate = (done)=>{
  Todo.remove({}).then(()=>{
     return Todo.insertMany(todos);
  }).then(()=>done());
};


module.exports = {todos, populate, users, populateUsers};

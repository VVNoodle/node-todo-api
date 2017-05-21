const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos = [{
    _id: new ObjectID(),
    todo: 'Go for a walk'
  },{
    _id: new ObjectID(),
    todo: 'eat lunch'
  },{
    _id: new ObjectID(),
    todo: 'Attend lecture',
    completed: true,
    completedAt: 2
  }
];

const populate = (done)=>{
  Todo.remove({}).then(()=>{
     return Todo.insertMany(todos);
  }).then(()=>done());
};

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'test@example.com',
  password: 'wrongpassword',
  tokens: [{
    access:'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'secret').toString()
  }]
},{
  _id: userTwoId,
  email:'wrong@hotmail.com',
  password: '12345678',
}];

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(()=>done());
};

module.exports = {todos, populate, users, populateUsers};
